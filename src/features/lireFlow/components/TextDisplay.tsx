import "../layout/textDisplayStyle.css";
import WordHighlighter from "./WordHighlighter";
import TextControls from "./TextControls";
import { useTextDisplay } from "../hooks/useTextDisplay";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const {
    paragraphIndex,
    highlightKey,
    isReading,
    speed,
    speedRef,
    wordsPerMinuteRef,
    containerRef,
    processedText,
    nextParagraph,
    startReading,
    pauseReading,
    restartReading,
    setSpeed,
  } = useTextDisplay(fileContent);

  if (!fileContent) return null;

  return (
    <>
      <TextControls
        wordsPerMinuteRef={wordsPerMinuteRef}
        speed={speed}
        speedRef={speedRef}
        setSpeed={setSpeed}
        startButton={startReading}
        pauseButton={pauseReading}
        restartButton={restartReading}
      />

      <div className="textContainer" ref={containerRef}>
        {processedText.title && (
          <h2 className="textContainer__textTitle">
            {paragraphIndex === -1 && wordsPerMinuteRef.current !== 0 ? (
              <WordHighlighter
                key={highlightKey}
                paragraph={processedText.title}
                onFinish={nextParagraph}
                isReading={isReading}
                speedRef={speedRef}
                wordsPerMinuteRef={wordsPerMinuteRef}
                containerRef={containerRef}
              />
            ) : (
              processedText.title
            )}
          </h2>
        )}

        {processedText.author && (
          <p className="textContainer__textAuthor">{processedText.author}</p>
        )}

        {processedText.paragraphs.map((paragraph, index) => (
          <p className="textContainer__text-paragraph" key={index}>
            {index === paragraphIndex && wordsPerMinuteRef.current !== 0 ? (
              <WordHighlighter
                key={highlightKey}
                paragraph={paragraph}
                onFinish={nextParagraph}
                isReading={isReading}
                speedRef={speedRef}
                wordsPerMinuteRef={wordsPerMinuteRef}
                containerRef={containerRef}
              />
            ) : (
              paragraph
            )}
          </p>
        ))}

        {processedText.source && (
          <a
            className="textContainer__textSource"
            href={processedText.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {processedText.source}
          </a>
        )}
      </div>
    </>
  );
};

export default TextDisplay;
