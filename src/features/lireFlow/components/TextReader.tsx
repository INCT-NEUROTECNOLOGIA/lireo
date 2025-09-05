import React from "react";
import TextDisplay from "./TextDisplay.jsx";
import Loading from "../../../utils/components/Loading.tsx";
import "../layout/textReaderStyle.css";
import { ROUTE_PATHS } from "../../../config/routes.ts";
import { useTextReader } from "../hooks/useTextReader";

const TextReader: React.FC = () => {
  const {
    state,
    selectedFile,
    selectedText,
    dropFile,
    dragFile,
    dragLeave,
    handleFileUploader,
    resetSelectFile,
    resetSelectText,
  } = useTextReader();

  const textReaderText = {
    uploadText: "Arraste o arquivo",
    uploadText2: ".txt",
    uploadText3: "até aqui ou ",
    uploadText4: "Selecione um arquivo",
    uploadText5: " ou ",
    placeholderSelectText: "Selecione um dos textos",
    texts: [
      "O Ratinho Rói-Rói (Leitura fácil)",
      "Conto ou não conto (Leitura média)",
      "A Cartomante (Leitura avançada)",
    ],
    fileText: "Arquivo:",
    newText: "Escolher um novo texto",
    summary: {
      title: "LireFlow",
      texts: [
        "O objetivo desta tarefa é treinar a fluência leitora, com foco no ritmo e na automatização da leitura.",
        "É possível carregar um arquivo no formato .txt ou escolher um dos textos disponíveis na plataforma.",
        "Durante a tarefa, o texto será exibido com marcações com destaque palavra por palavra, em um tempo que pode ser ajustado conforme a necessidade.",
      ],
      linkText: "Para mais informações, acesse o ",
      link: "Guia do Usuário.",
      linkRef: ROUTE_PATHS.USER_GUIDE_LIRE_FLOW,
    },
  };

  return (
    <>
      <div
        className={"taskSummary" + (state.fileUploaderClose ? " hidden" : "")}
      >
        <h1>{textReaderText.summary.title}</h1>
        <ul>
          {textReaderText.summary.texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
          <li>
            {textReaderText.summary.linkText}
            <a
              href={textReaderText.summary.linkRef}
              target="_blank"
              rel="noopener noreferrer"
            >
              {textReaderText.summary.link}
            </a>
          </li>
        </ul>
      </div>

      <div className="textReaderContainer">
        <div
          className={
            "textReaderContainer__fileUploader" +
            (state.fileUploaderClose ? " hidden" : "")
          }
          onDrop={dropFile}
          onDragOver={dragFile}
          onDragLeave={dragLeave}
          style={{
            backgroundColor: state.isDragging
              ? "var(--color-accent-hover)"
              : "var(--color-accent)",
          }}
        >
          <i className="bi bi-cloud-upload"></i>
          <div className="textReaderContainer__fileUploader__text">
            {textReaderText.uploadText}{" "}
            <strong>{textReaderText.uploadText2}</strong>{" "}
            {textReaderText.uploadText3}
          </div>
          <div className="textReaderContainer__fileUploader__inputSelectGroup">
            <label
              htmlFor="upload-file"
              className="textReaderContainer__fileUploader__label"
              title={textReaderText.uploadText4}
            >
              <strong>{textReaderText.uploadText4}</strong>
            </label>
            <input
              id="upload-file"
              type="file"
              onClick={resetSelectFile}
              onChange={selectedFile}
              className="textReaderContainer__fileUploader__input"
            />
            {textReaderText.uploadText5}
            <select
              className="textReaderContainer__fileUploader__selectText"
              name="texts"
              id="texts"
              defaultValue=""
              onChange={selectedText}
              ref={resetSelectText}
              title={textReaderText.placeholderSelectText}
            >
              <option value="" disabled>
                {textReaderText.placeholderSelectText}
              </option>
              {textReaderText.texts.map((text, index) => (
                <option key={index} value={text} title={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        {state.fileName && (
          <div className="textReaderContainer__header">
            <p className="textReaderContainer__fileName" title={state.fileName}>
              <strong>{textReaderText.fileText}</strong> {state.fileName}
            </p>

            {state.fileUploaderClose && (
              <button
                className="textReaderContainer__button"
                onClick={handleFileUploader}
              >
                {textReaderText.newText}
              </button>
            )}
          </div>
        )}

        {state.isLoading && !state.fileContent ? (
          <Loading />
        ) : (
          <TextDisplay fileContent={state.fileContent} />
        )}
      </div>
    </>
  );
};

export default TextReader;
