import "../layout/textDisplayStyle.css";
import React, { useState } from "react";
import WordHighlighter from "./WordHighlighter";

const TextDisplay = ({ fileContent }: { fileContent: string }) => {
  const paragraphs: string[] = fileContent.split("\n");

  const [paragraphIndex, setParagraphIndex] = useState<number>(0);

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

  return (
    fileContent && (
      <div className="textContainer">
        {title && <h2 className="textContainer__textTitle">{title}</h2>}

        {author && <p className="textContainer__textAuthor">{author}</p>}

        {paragraphs.map((paragraph, index) => (
          <p className="textContainer__text-paragraph" key={index}>
            {index === paragraphIndex ? (
              <WordHighlighter paragraph={paragraph} onFinish={nextParagraph} />
            ) : (
              paragraph
            )}
          </p>
        ))}

        {source && <p className="textContainer__textSource">{source}</p>}
      </div>
    )
  );
};

export default TextDisplay;
