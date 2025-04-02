import React, { useState, useEffect } from "react";
import { hyphenate } from "hyphen/pt";

const HyphenWord = ({ word }) => {
  const [isMarcked, setIsMarcked] = useState(false);

  // Divide a palavra em sílabas apenas uma vez
  useEffect(() => {
    const applyHyphenation = async () => {
      const hyphenatedText = await hyphenate(word, { hyphenChar: "-" });
      const syllablesCount = hyphenatedText.split("-").length;

      // Calculo do tempo em função da quantidade de sílabas
      const wordTime = syllablesCount * 0.2;

      setIsMarcked(true);

      // Desmarca a palavra após o tempo calculado
      setTimeout(() => {
        setIsMarcked(false);
      }, wordTime * 5000);
    };

    applyHyphenation();
  }, [word]);

  return isMarcked ? <mark>{word}</mark> : <span>{word}</span>;
};

export default HyphenWord;
