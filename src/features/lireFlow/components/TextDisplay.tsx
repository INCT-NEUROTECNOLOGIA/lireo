import '../layout/textDisplayStyle.css';
import WordHighlighter from './WordHighlighter';
import TextControls from './TextControls';
import { useTextDisplay } from '../hooks/useTextDisplay';

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const {
    processedText,
    paragraphIndex,
    highlightKey,
    isReading,
    speed,
    speedRef,
    wordsPerMinuteRef,
    setSpeed,
    setIsReading,
    nextParagraph,
    setParagraphIndex,
    setHighlightKey,
  } = useTextDisplay({ fileContent });

  if (!fileContent) return null;

  return (
    fileContent && (
      <>
        <TextControls
          speed={speed}
          setSpeed={setSpeed}
          speedRef={speedRef}
          wordsPerMinuteRef={wordsPerMinuteRef}
          startButton={(): void => {
            if (wordsPerMinuteRef.current !== 0) setIsReading(true);
          }}
          pauseButton={(): void => setIsReading(false)}
          restartButton={(): void => {
            setParagraphIndex(processedText.title ? -1 : 0);
            setHighlightKey((prevKey) => prevKey + 1);
            setIsReading(false);
          }}
        />

        <div className="textContainer">
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
    )
  );
};

export default TextDisplay;
