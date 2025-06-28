import "../layout/textDisplayStyle.css";
import { useState, useRef, useMemo } from "react";
import WordHighlighter from "./WordHighlighter";
import TextControls from "./TextControls";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const [paragraphIndex, setParagraphIndex] = useState<number>(0);
  const [highlightKey, setHighlightKey] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const speedRef = useRef<number>(1);
  const wordsPerMinuteRef = useRef<number>(120);

  const isTitle = (line: string): boolean => {
    const wordCount = line.split(/\s+/).length;
    return wordCount <= 10;
  };

  const isAuthor = (line: string): boolean => {
    const wordCount = line.split(/\s+/).length;
    const endsWithPunctuation = /[.!?]$/.test(line);
    return wordCount <= 6 && !endsWithPunctuation;
  };

  const isSource = (line: string): boolean => {
    return (
      /^(fonte|refer(ê|e)ncia|extra[ií]do|dispon[ií]vel)/i.test(line) ||
      /(http|www\.)/.test(line)
    );
  };

  const processedText = useMemo(() => {
    const allParagraphs = fileContent
      .split("\n")
      .map((paragraph: string) => paragraph.trim())
      .filter((trimmedParagraph: string) => trimmedParagraph);

    let paragraphs = allParagraphs;
    let title = "";
    let author = "";
    let source = "";

    if (allParagraphs.length > 0 && isTitle(allParagraphs[0])) {
      title = allParagraphs[0];
      paragraphs = paragraphs.slice(1);
    }

    if (paragraphs.length > 0 && isAuthor(paragraphs[0])) {
      author = paragraphs[0];
      paragraphs = paragraphs.slice(1);
    }

    if (paragraphs.length > 1 && isSource(paragraphs[paragraphs.length - 1])) {
      source = paragraphs[paragraphs.length - 1];
      paragraphs = paragraphs.slice(0, -1);
    }

    return { paragraphs, title, author, source };
  }, [fileContent]);

  const nextParagraph = (): void => {
    if (paragraphIndex < processedText.paragraphs.length - 1) {
      setParagraphIndex((prevIndex) => prevIndex + 1);
    } else {
      setParagraphIndex(processedText.paragraphs.length);
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
          {processedText.title && (
            <h2 className="textContainer__textTitle">{processedText.title}</h2>
          )}

          {processedText.author && (
            <p className="textContainer__textAuthor">{processedText.author}</p>
          )}

          {processedText.paragraphs.map((paragraph, index) => (
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

          {processedText.source && (
            <p className="textContainer__textSource">{processedText.source}</p>
          )}
        </div>
      </>
    )
  );
};

export default TextDisplay;
