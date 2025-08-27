import { RefObject, useRef } from "react";
import { useWordHighlighter } from "../hooks/useWordHighlighter";

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
  const { currentIndex, currentWordRef, elements } = useWordHighlighter({
    paragraph,
    isReading,
    speedRef,
    wordsPerMinuteRef,
    containerRef,
    onFinish,
  });

  return (
    <>
      {elements.map((element, index) => (
        <span
          key={index}
          ref={index === currentIndex ? currentWordRef : null}
          className={`wordElement ${
            index === currentIndex ? "highlighted" : ""
          }`}
        >
          {element}
        </span>
      ))}
    </>
  );
};

export default WordHighlighter;
