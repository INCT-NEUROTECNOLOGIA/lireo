import "../layout/textDisplayStyle.css";
import React, { useState, useRef, useMemo } from "react";
import WordHighlighter from "./WordHighlighter";
import TextControls from "./TextControls";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [highlightKey, setHighlightKey] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const speedRef = useRef<number>(1);
  const wordsPerMinuteRef = useRef<number>(120);

  const allParagraphs = useMemo(() => {
    return fileContent
      .split("\n")
      .map((paragraph: string) => paragraph.trim())
      .filter((trimmedParagraph: string) => trimmedParagraph);
  }, [fileContent]);

  const title = allParagraphs[0];
  const paragraphs = allParagraphs.slice(1);

  const nextParagraph = (): void => {
    if (paragraphIndex < paragraphs.length - 1) {
      setParagraphIndex((prevIndex) => prevIndex + 1);
    } else {
      setParagraphIndex(paragraphs.length);
    }
  };

  return (
    fileContent && (
      <>
        <TextControls
          speed={speed}
          setSpeed={setSpeed}
          speedRef={speedRef}
          wordsPerMinuteRef={wordsPerMinuteRef}
          startButton={(): void => setIsReading(true)}
          pauseButton={(): void => setIsReading(false)}
          restartButton={(): void => {
            setParagraphIndex(0);
            setHighlightKey((prevKey) => prevKey + 1);
            setIsReading(false);
          }}
        />

        <div className="textContainer">
          {title && <h2 className="textContainer__textTitle">{title}</h2>}

          {paragraphs.map((paragraph, index) => (
            <p className="textContainer__text-paragraph" key={index}>
              {index === paragraphIndex ? (
                <WordHighlighter
                  key={highlightKey}
                  paragraph={paragraph}
                  onFinish={nextParagraph}
                  isReading={isReading}
                  speedRef={speedRef}
                  wordsPerMinuteRef={wordsPerMinuteRef}
                />
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>
      </>
    )
  );
};

export default TextDisplay;
