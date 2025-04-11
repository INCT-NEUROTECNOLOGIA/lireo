import React, { useEffect, useState } from "react";
import { hyphenate } from "hyphen/pt";

const Highlights = ({
  paragraph,
  onFinish,
}: {
  paragraph: string;
  onFinish?: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const elements: string[] = paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/);

  const isWord = (element: string): boolean => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);

  useEffect((): void => {
    const wordIndexs: number[] = elements
      .map((element: string, index: number): number | null => (isWord(element) ? index : null))
      .filter((index): index is number => index !== null);

    const calculateWordTime = async (word: string): Promise<number> => {
      const hyphenatedText: string = await hyphenate(word, { hyphenChar: "-" });
      const syllablesCount: number = hyphenatedText.split("-").length;
      return syllablesCount * 0.2 * 1000;
    };

    const nextWord = async (): Promise<void> => {
      for (const index of wordIndexs) {
        setCurrentIndex(index);

        const wordTime: number = await calculateWordTime(elements[index]);

        await new Promise((resolve) => setTimeout(resolve, wordTime));
      }

      setCurrentIndex(null);

      onFinish?.();
    };

    nextWord();
  }, [paragraph]);

  return elements.map((element: string, index: number) => {
    return index === currentIndex ? (
      <mark key={index}>{element}</mark>
    ) : (
      element
    );
  });
};

export default Highlights;
