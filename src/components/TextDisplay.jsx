import React from "react";
import Highlights from "./Highlights";

const TextDisplay = ({ fileContent }) => {
  // Divide o conteúdo do arquivo em parágrafos
  const paragraphs = fileContent.split("\n");

  // Obtem o titulo, o autor e o link do texto e remove do array
  const title = paragraphs.shift();
  const author = paragraphs.shift();
  const link = paragraphs.pop();

  // Retorna o componente
  return (
    /* Exibe o conteúdo do arquivo se houver */
    fileContent && (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "500px",
          overflow: "auto",
          backgroundColor: "#f4f4f4",
          color: "#333",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Exibe o titulo do texto */}
        {title && (
          <h2
            style={{
              fontSize: "1.5em",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {title}
          </h2>
        )}

        {/* Exibe o nome do autor */}
        {author && (
          <p style={{ fontSize: "0.8em", textAlign: "right" }}>{author}</p>
        )}

        {/* Exibe os parágrafos formatados */}
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              textAlign: "justify", // Justifica o texto
              textIndent: "4em", // Adiciona o recuo no início de cada parágrafo
              lineHeight: "1.5", // Melhora a legibilidade com mais espaço entre linhas
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              whiteSpace: "pre-wrap", // Mantém quebras de linha e espaços
              wordWrap: "break-word", // Quebra palavras longas
            }}
          >
            <Highlights paragraph={paragraph} />
            {/* {paragraph} */}
          </p>
        ))}

        {/* Exibe o link do texto */}
        {link && (
          <p style={{ fontSize: "0.8em", textAlign: "right" }}>{link}</p>
        )}
      </div>
    )
  );
};

export default TextDisplay;
