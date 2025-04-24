import "../layout/textDisplayStyle.css";
import React, { useState, useMemo } from "react";
import WordHighlighter from "./WordHighlighter";
import TextControls from "./TextControls";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const [speed, setSpeed] = useState<number>(1);
  const paragraphs: string[] = useMemo(() => {
    return fileContent
      .split("\n")
      .map((paragraph: string) => paragraph.trim())
      .filter((trimmedParagraph: string) => trimmedParagraph);
  }, [fileContent]);

  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(false);

  const title: string | undefined = paragraphs.shift();
  const author: string | undefined = paragraphs.shift();
  const source: string | undefined = paragraphs.pop();

  const nextParagraph = (): void => {
    if (paragraphIndex < paragraphs.length - 1) {
      setParagraphIndex((prevIndex) => prevIndex + 1);
    } else {
      setParagraphIndex(paragraphs.length);
    }
  };

  const startButton = (): void => {
    setIsReading(true);
  };

  const pauseButton = (): void => {
    setIsReading(false);
  };

  return (
    fileContent && (
      <>
        <TextControls
          speed={speed}
          setSpeed={setSpeed}
          startButton={startButton}
          pauseButton={pauseButton}
        />

        <div className="textContainer">
          {title && <h2 className="textContainer__textTitle">{title}</h2>}

          {author && <p className="textContainer__textAuthor">{author}</p>}

          {paragraphs.map((paragraph, index) => (
            <p className="textContainer__text-paragraph" key={index}>
              {index === paragraphIndex ? (
                <WordHighlighter
                  paragraph={paragraph}
                  onFinish={nextParagraph}
                  isReading={isReading}
                />
              ) : (
                paragraph
              )}
            </p>
          ))}

          {source && <p className="textContainer__textSource">{source}</p>}
        </div>
      </>
    )
  );
};

export default TextDisplay;
