import { useEffect, useState, useRef, RefObject } from "react";
import { hyphenate } from "hyphen/pt";
import useReadingParameters from "./useReadingParameters";

interface UseWordHighlighterProps {
  paragraph: string;
  isReading: boolean;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
  containerRef: RefObject<HTMLDivElement | null>;
  onFinish?: () => void;
}

export const useWordHighlighter = ({
  paragraph,
  isReading,
  speedRef,
  wordsPerMinuteRef,
  containerRef,
  onFinish,
}: UseWordHighlighterProps) => {
  const { averageSyllableTime, punctuationMarksTime } = useReadingParameters();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const elementIndexes = useRef<number[]>([]);
  const indexRef = useRef<number>(0);
  const isReadingRef = useRef<boolean>(isReading);
  const timeoutRef = useRef<number | null>(null);
  const currentWordRef = useRef<HTMLSpanElement | null>(null);

  const elements: string[] = paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/);

  const isWord = (element: string): boolean => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);
  const isPunctuation = (element: string): boolean =>
    /^[.,!?;:"()]+$/.test(element);

  useEffect(() => {
    elementIndexes.current = elements
      .map((el, i) => (isWord(el) || isPunctuation(el) ? i : null))
      .filter((i): i is number => i !== null);

    indexRef.current = 0;
    setCurrentIndex(null);
  }, [paragraph]);

  useEffect(() => {
    isReadingRef.current = isReading;

    const calculateWordTime = async (word: string) => {
      const hyphenatedText = await hyphenate(word, { hyphenChar: "-" });
      const syllablesCount = hyphenatedText.split("-").length;
      return Math.round(
        (syllablesCount * averageSyllableTime(wordsPerMinuteRef.current)) /
          speedRef.current
      );
    };

    const highlightFlow = async () => {
      while (indexRef.current < elementIndexes.current.length) {
        if (!isReadingRef.current) return;

        const element = elements[elementIndexes.current[indexRef.current]];
        let waitTime = 0;

        if (isWord(element)) {
          setCurrentIndex(elementIndexes.current[indexRef.current]);
          waitTime = await calculateWordTime(element);
        } else {
          waitTime =
            punctuationMarksTime.find((mark) => mark.mark === element)?.time ||
            150;
        }

        await new Promise(
          (resolve) => (timeoutRef.current = setTimeout(resolve, waitTime))
        );
        indexRef.current++;
      }

      setCurrentIndex(null);

      if (onFinish) {
        await new Promise((resolve) => (timeoutRef.current = setTimeout(resolve, 500)));
        onFinish();
      }
    };

    highlightFlow();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isReading, elements]);

 
  useEffect(() => {
    if (!currentWordRef.current || !containerRef.current) return;
    const word = currentWordRef.current;
    const container = containerRef.current;

    const target = word.offsetTop - container.clientHeight / 4 + word.offsetHeight;

    if (Math.abs(container.scrollTop - target) > 4) {
      container.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [currentIndex]);

  return {
    currentIndex,
    currentWordRef,
    elements,
    isWord,
  };
};
