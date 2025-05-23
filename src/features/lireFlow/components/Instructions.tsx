import React from "react";
import "../layout/instructionsStyle.css";

const Instructions: React.FC = () => {
  const instructionsText = {
    title: "Instruções para Uso do Leitor de Texto",
    steps: [
      "Faça o upload de um arquivo de texto no formato .txt ou selecione um texto pré-carregado.",
      "Ajuste a velocidade de leitura utilizando o controle deslizante.",
      "Escolha o ano escolar para ajustar a velocidade de leitura com base no nível de dificuldade.",
      "Clique em 'Iniciar' para começar a leitura, 'Pausar' para interromper, ou 'Reiniciar' para começar do início.",
      "Acompanhe o texto destacado enquanto o leitor avança automaticamente.",
    ],
  };

  return (
    <div className="instructionsContainer">
      <h1 className="instructionsContainer__title">{instructionsText.title}</h1>
      <ul className="instructionsContainer__list">
        {instructionsText.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions;