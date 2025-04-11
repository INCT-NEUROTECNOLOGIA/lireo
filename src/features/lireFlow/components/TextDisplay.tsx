import "../layout/textStyle.css";
import React, { useState } from "react";
import WordHighlighter from "./WordHighlighter";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const paragraphs: string[] = fileContent.split("\n");

  const [paragraphIndex, setParagraphIndex] = useState<number>(0);

  const title: string | undefined = paragraphs.shift();
  const author: string | undefined = paragraphs.shift();
  const font: string | undefined = paragraphs.pop();

  const nextParagraph = (): void => {
    if (paragraphIndex < paragraphs.length - 1) {
      setParagraphIndex((prevIndex) => prevIndex + 1);
    } else {
      setParagraphIndex(paragraphs.length);
    }
  };

  return (
    fileContent && (
      <div className="text-container">
        {title && <h2 className="text-title">{title}</h2>}

        {author && <p className="text-author">{author}</p>}

        {paragraphs.map((paragraph, index) => (
          <p className="text-paragraph" key={index}>
            {index === paragraphIndex ? (
              <WordHighlighter paragraph={paragraph} onFinish={nextParagraph} />
            ) : (
              paragraph
            )}
          </p>
        ))}

        {font && <p className="text-font">{font}</p>}
      </div>
    )
  );
};

export default TextDisplay;
