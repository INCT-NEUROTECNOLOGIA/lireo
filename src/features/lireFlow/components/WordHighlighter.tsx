import React, { useEffect, useState, useRef, RefObject } from "react";
import { hyphenate } from "hyphen/pt";
import { averageSyllableTimeByGrade } from "./ReadingParameters";

const WordHighlighter = ({
  paragraph,
  onFinish,
  isReading,
  gradeRef,
  speedRef,
}: {
  paragraph: string;
  onFinish?: () => void;
  isReading: boolean;
  gradeRef: RefObject<number>;
  speedRef: RefObject<number>;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const wordIndexs = useRef<number[]>([]);
  const indexRef = useRef<number>(0);
  const isReadingRef = useRef<boolean>(isReading);
  const timeoutRef = useRef<number | null>(null);

  const elements: string[] = paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/);

  const isWord = (element: string): boolean => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);

  useEffect((): void => {
    wordIndexs.current = elements
      .map((element: string, index: number): number | null =>
        isWord(element) ? index : null
      )
      .filter((index): index is number => index !== null);

    indexRef.current = 0;
    setCurrentIndex(null);
  }, [paragraph]);

  useEffect((): (() => void) => {
    isReadingRef.current = isReading;

    const calculateWordTime = async (word: string): Promise<number> => {
      const hyphenatedText: string = await hyphenate(word, { hyphenChar: "-" });
      const syllablesCount: number = hyphenatedText.split("-").length;
      return Math.round(
        (syllablesCount * averageSyllableTimeByGrade(gradeRef.current)) /
          speedRef.current
      );
    };

    const highlightFlow = async (): Promise<void> => {
      while (indexRef.current < wordIndexs.current.length) {
        if (!isReadingRef.current) return;

        setCurrentIndex(wordIndexs.current[indexRef.current]);

        const wordTime: number = await calculateWordTime(
          elements[wordIndexs.current[indexRef.current]]
        );

        await new Promise(
          (resolve) => (timeoutRef.current = setTimeout(resolve, wordTime))
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

  return elements.map((element: string, index: number) => {
    return index === currentIndex ? (
      <mark key={index}>{element}</mark>
    ) : (
      <span key={index}>{element}</span>
    );
  });
};

export default WordHighlighter;
