import React, { useEffect, useState } from "react";
import { hyphenate } from "hyphen/pt";

const Highlights = ({ paragraph, onFinish }) => {
  const [marckedIndex, setMarckedIndex] = useState(null);

  // Divide o conteúdo do parágrafo em elementos
  const elements = paragraph.split(/(\s+|[^\wÀ-ÖØ-öø-ÿ])/);

  // Função que verifica se o elemento é uma palavra
  const isWord = (element) => /^[\wÀ-ÖØ-öø-ÿ]+$/.test(element);

  useEffect(() => {
    // Obtem os indices das palavras dentro do array de elementos
    const wordIndexs = elements
      .map((e, i) => (isWord(e) ? i : null))
      .filter((i) => i !== null);

    const nextWord = async () => {
      for (const index of wordIndexs) {
        setMarckedIndex(index);
        // Divide a palavra em sílabas e calcula o seu tempo de destaque
        const hyphenatedText = await hyphenate(elements[index], {
          hyphenChar: "-",
        });
        const syllablesCount = hyphenatedText.split("-").length;
        let wordTime = syllablesCount * 0.2 * 1000;

        // Pausa a execução do código enquanto espera o wordTime
        await new Promise((resolve) => setTimeout(resolve, wordTime));
      }

      // Depois que passa por todas as palavras, limpa o destaque
      setMarckedIndex(null);

      // Caso tenha terminado o parágrafo, avisa
      if (onFinish) onFinish();
    };

    nextWord();
  }, [paragraph]);

  // Se o elemento for uma palavra, ela é destacada
  return elements.map((element, index) => {
    if (isWord(element)) {
      return index === marckedIndex ? (
        <mark key={index}>{element}</mark>
      ) : (
        element
      );
    } else {
      return element;
    }
  });
};

export default Highlights;
