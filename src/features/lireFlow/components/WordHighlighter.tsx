import { useEffect, useState, useRef, RefObject } from "react";
import { hyphenate } from "hyphen/pt";
import { averageSyllableTime } from "./ReadingParameters";
import { punctuationMarksTime } from "./ReadingParameters";

const WordHighlighter = ({
  paragraph,
  onFinish,
  isReading,
  speedRef,
  wordsPerMinuteRef,
  containerRef,
}: {
  paragraph: string;
  onFinish?: () => void;
  isReading: boolean;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
  containerRef: RefObject<HTMLDivElement | null>;
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

  useEffect((): void => {
    elementIndexs.current = elements
      .map((element: string, index: number): number | null =>
        isWord(element) || isPunctuation(element) ? index : null
      )
      .filter((index): index is number => index !== null);

    indexRef.current = 0;
    setCurrentIndex(null);
  }, [paragraph]);

  useEffect((): (() => void) => {
    isReadingRef.current = isReading;

    const fixWordHyphenation = (word: string, hyphenated: string): string => {
      const isVowel = /^[aeiouáéíóúàâêôãõü]$/i;
      const starWithVowel = /^[aeiouáéíóúàâêôãõü]/i;
      const endWithTwoVowels = /[aeiouáéíóúàâêôãõ]{2}$/i;
      const strongVowels = /^[aáéíóúàâêôãõ]$/i;
      const weakVowels = /^[eiou]$/i;

      if (word.length <= 2) return word;

      if (starWithVowel.test(word)) {
        if (/^[lmnrs]$/i.test(word[1]) && !isVowel.test(word[2])) {
          hyphenated = hyphenated.slice(0, 2) + "-" + hyphenated.slice(2);
        } else {
          hyphenated = hyphenated.slice(0, 1) + "-" + hyphenated.slice(1);
        }
      }

      if (endWithTwoVowels.test(word)) {
        const lastIndex = word.length - 1;
        const lastLetter = word[lastIndex];
        const penulLetter = word[lastIndex - 1];

        const isHiato =
          (strongVowels.test(penulLetter) && strongVowels.test(lastLetter)) ||
          (strongVowels.test(penulLetter) && weakVowels.test(lastLetter));

        if (isHiato) {
          hyphenated = word.slice(0, lastIndex) + "-" + word.slice(lastIndex);
        }
      }

      if (!hyphenated.includes("-") && word.length > 3) {
        hyphenated = word.slice(0, 2) + "-" + word.slice(2);
      }

      return hyphenated;
    };

    const calculateWordTime = async (word: string): Promise<number> => {
      const hyphenatedText: string = fixWordHyphenation(
        word,
        await hyphenate(word, { hyphenChar: "-" })
      );

      const syllablesCount: number = hyphenatedText
        .split("-")
        .filter((syllable) => syllable.trim() !== "").length;
      console.log(hyphenatedText);
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
    if (!currentWordRef.current || !containerRef.current) return;

    const word = currentWordRef.current;
    const container = containerRef.current;

    const target =
      word.offsetTop - container.clientHeight / 4 + word.offsetHeight;

    if (Math.abs(container.scrollTop - target) > 4) {
      container.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [currentIndex]);

  return elements.map((element: string, index: number) => (
    <span
      key={index}
      ref={index === currentIndex ? currentWordRef : null}
      className={`wordElement ${index === currentIndex ? "highlighted" : ""}`}
    >
      {element}
    </span>
  ));
};

export default WordHighlighter;
