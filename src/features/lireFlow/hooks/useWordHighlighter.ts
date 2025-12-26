import { useCallback, useState, useRef, RefObject, useMemo } from 'react';
import { hyphenate } from 'hyphen/pt';
import { averageSyllableTime } from '../components/readingParameters';
import { PUNCTUATION_MARKS_TIME } from '../constants/readingContants';
import { RegexConstants } from '../constants/regexConstants';

export const useWordHighlighter = ({
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
  const activeFlowIdRef = useRef<number>(0);

  const elements = useMemo(
    () => paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/),
    [paragraph],
  );

  const isWord = (element: string): boolean => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);
  const isPunctuation = (element: string): boolean =>
    /^[.,!?;:"()]+$/.test(element);

  const initializeElementIndexs = useCallback((): void => {
    elementIndexs.current = elements
      .map((element: string, index: number): number | null =>
        isWord(element) || isPunctuation(element) ? index : null,
      )
      .filter((index): index is number => index !== null);

    indexRef.current = 0;
    setCurrentIndex(null);
  }, [elements]);

  const fixWordHyphenation = (word: string, hyphenated: string): string => {
    if (word.length <= 2) return word;

    const {
      vowel,
      startWithVowel,
      endWithTwoVowels,
      strongVowels,
      weakVowels,
    } = RegexConstants;

    if (startWithVowel.test(word)) {
      const fixHyphenationWordsStartWithVowel = (hyphenated: string) => {
        const shouldAttachConsonantToPreviousVowel =
          /^[lmnrs]$/i.test(word[1]) && !vowel.test(word[2]);

        if (shouldAttachConsonantToPreviousVowel) {
          return hyphenated.slice(0, 2) + '-' + hyphenated.slice(2);
        }

        return hyphenated.slice(0, 1) + '-' + hyphenated.slice(1);
      };

      hyphenated = fixHyphenationWordsStartWithVowel(hyphenated);
    }

    if (endWithTwoVowels.test(word)) {
      const applyHiatusHyphenationRule = (hyphenated: string) => {
        const lastIndex = word.length - 1;
        const lastLetter = word[lastIndex];
        const penulLetter = word[lastIndex - 1];
        const isHiatus =
          (strongVowels.test(penulLetter) && strongVowels.test(lastLetter)) ||
          (strongVowels.test(penulLetter) && weakVowels.test(lastLetter));

        if (isHiatus) {
          return (
            hyphenated.slice(0, lastIndex) + '-' + hyphenated.slice(lastIndex)
          );
        }

        return word;
      };
      hyphenated = applyHiatusHyphenationRule(hyphenated);
    }

    if (!hyphenated.includes('-') && word.length > 3) {
      hyphenated = word.slice(0, 2) + '-' + word.slice(2);
    }

    return hyphenated;
  };

  const calculateWordTime = async (word: string): Promise<number> => {
    const hyphenatedText: string = fixWordHyphenation(
      word,
      await hyphenate(word, { hyphenChar: '-' }),
    );

    const syllablesCount: number = hyphenatedText
      .split('-')
      .filter((syllable) => syllable.trim() !== '').length;

    return Math.round(
      (syllablesCount * averageSyllableTime(wordsPerMinuteRef.current)) /
        speedRef.current,
    );
  };

  const isNotActiveFlow = (flowId: number): boolean => {
    return activeFlowIdRef.current !== flowId;
  };

  const highlightFlow = async (flowId: number): Promise<void> => {
    while (indexRef.current < elementIndexs.current.length) {
      const shouldStopReading =
        !isReadingRef.current || isNotActiveFlow(flowId);

      if (shouldStopReading) return;

      const element: string = elements[elementIndexs.current[indexRef.current]];

      let waitTime: number = 0;

      if (isWord(element)) {
        setCurrentIndex(elementIndexs.current[indexRef.current]);

        waitTime = await calculateWordTime(element);

        if (isNotActiveFlow(flowId)) return;
      } else {
        waitTime =
          PUNCTUATION_MARKS_TIME.find((mark) => mark.mark === element)?.time ||
          150;
      }

      await new Promise(
        (resolve) => (timeoutRef.current = setTimeout(resolve, waitTime)),
      );

      if (isNotActiveFlow(flowId)) return;

      indexRef.current++;
    }

    setCurrentIndex(null);

    if (!onFinish) return;

    if (isNotActiveFlow(flowId)) return;

    await new Promise(
      (resolve) => (timeoutRef.current = setTimeout(resolve, 500)),
    );

    if (!isNotActiveFlow(flowId)) {
      onFinish();
    }
  };

  const runReadingFlow = useCallback((): (() => void) => {
    isReadingRef.current = isReading;

    activeFlowIdRef.current = ++activeFlowIdRef.current;
    const newFlowId = activeFlowIdRef.current;

    highlightFlow(newFlowId);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    isReading,
    elements,
    onFinish,
    wordsPerMinuteRef.current,
    speedRef.current,
  ]);

  const scrollToCurrentWord = useCallback(() => {
    const word = currentWordRef.current;
    const container = containerRef.current;

    const isMissingScrollRequirements =
      !word || !container || !('IntersectionObserver' in window);

    if (isMissingScrollRequirements) return;

    const scrollTimeout = setTimeout(() => {
      word.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, [currentIndex, containerRef]);

  return {
    elements,
    currentIndex,
    currentWordRef,
    initializeElementIndexs,
    runReadingFlow,
    scrollToCurrentWord,
  };
};
