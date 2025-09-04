import { RefObject, useEffect } from "react";
import { useWordHighlighter } from "../hooks/useWordHighlighter";

const WordHighlighter = ({
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
  const {
    elements,
    currentIndex,
    currentWordRef,
    initializeIndexes,
    updateReadingState,
    scrollToCurrentWord,
  } = useWordHighlighter({
    paragraph,
    onFinish,
    isReading,
    speedRef,
    wordsPerMinuteRef,
  });

  useEffect(() => {
    initializeIndexes();
  }, [initializeIndexes]);

  useEffect(() => {
    return updateReadingState();
  }, [updateReadingState]);

  useEffect(() => {
    scrollToCurrentWord();
  }, [scrollToCurrentWord]);

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
