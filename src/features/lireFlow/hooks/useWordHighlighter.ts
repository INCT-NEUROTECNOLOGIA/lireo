import { useEffect, useState, useRef, RefObject, useCallback } from "react";
import { hyphenate } from "hyphen/pt";
import { averageSyllableTime, punctuationMarksTime } from "../components/ReadingParameters";

export const useWordHighlighter = ({
  paragraph,
  onFinish,
  isReading,
  speedRef,
  wordsPerMinuteRef,
}: {
  paragraph: string;
  onFinish?: () => void;
  isReading: boolean;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const elementIndexs = useRef<number[]>([]);
  const indexRef = useRef<number>(0);
  const isReadingRef = useRef<boolean>(isReading);
  const timeoutRef = useRef<number | null>(null);
  const currentWordRef = useRef<HTMLSpanElement | null>(null);

  const elements: string[] = paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/);

  const isWord = (element: string): boolean => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);
  const isPunctuation = (element: string): boolean =>
    /^[.,!?;:"()]+$/.test(element);

  const initializeIndexes = useCallback(() => {
    elementIndexs.current = elements
      .map((element: string, index: number): number | null =>
        isWord(element) || isPunctuation(element) ? index : null
      )
      .filter((index): index is number => index !== null);

    indexRef.current = 0;
    setCurrentIndex(null);
  }, [paragraph]);

  const updateReadingState = useCallback(() => {
    isReadingRef.current = isReading;

    const calculateWordTime = async (word: string): Promise<number> => {
      const hyphenatedText: string = await hyphenate(word, { hyphenChar: "-" });
      const syllablesCount: number = hyphenatedText.split("-").length;
      return Math.round(
        (syllablesCount * averageSyllableTime(wordsPerMinuteRef.current)) /
          speedRef.current
      );
    };

    const highlightFlow = async (): Promise<void> => {
      while (indexRef.current < elementIndexs.current.length) {
        if (!isReadingRef.current) return;

        const element: string =
          elements[elementIndexs.current[indexRef.current]];

        let waitTime: number = 0;

        if (isWord(element)) {
          setCurrentIndex(elementIndexs.current[indexRef.current]);
          waitTime = await calculateWordTime(element);
        } else {
          waitTime =
            punctuationMarksTime.find((mark: { mark: string; }) => mark.mark === element)?.time ||
            150;
        }

        await new Promise(
          (resolve) => (timeoutRef.current = setTimeout(resolve, waitTime))
        );

        indexRef.current++;
      }

      setCurrentIndex(null);
      if (onFinish) {
        await new Promise(
          (resolve) => (timeoutRef.current = setTimeout(resolve, 500))
        );
        onFinish();
      }
    };

    highlightFlow();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isReading]);

  useEffect(() => {
    if (currentWordRef.current) {
      currentWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);
    return { elements, currentIndex, currentWordRef, initializeIndexes, updateReadingState  };
};