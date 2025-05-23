import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextDisplay from "./TextDisplay.jsx";
import "../layout/textReaderStyle.css";

const TextReader: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const resetSelectText = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const textReaderText = {
    uploadText: "Arraste o arquivo",
    uploadText2: ".txt",
    uploadText3: "até aqui ou ",
    uploadText4: "Selecione arquivo",
    uploadText5: " ou ",
    placeholderSelectText: "Selecione um dos textos",
    texts: [
      "No Reino das Letras Felizes (Leitura fácil)",
      "O Ratinho Rói-Rói (Leitura fácil)",
      "Conto ou não conto (Leitura média)",
      "A Cartomante (Leitura avançada)",
    ],
    fileText: "Arquivo:",
    instructionsButton: "Ver Instruções",
  };

  const selectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName("");
    setFileContent("");
    setError("");

    if (!event.target.files) return;

    const file: File = event.target.files[0];
    const isTxtFile = (fileType: string): boolean => fileType === "text/plain";
    if (!file) return;

    if (!isTxtFile(file.type)) {
      setError("Selecione um arquivo de texto (.txt)");
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = (): void => {
      if (typeof reader.result === "string") {
        setFileName(file.name);
        setFileContent(reader.result);
        setError("");
      } else {
        setError("Erro ao ler o arquivo");
      }
    };

    reader.onerror = (): void => {
      setError("Erro ao ler o arquivo");
    };
  };

  const selectedText = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFileName(event.target.value);
    setError("");

    try {
      const response = await fetch(`/texts/${event.target.value}.txt`);
      const text = await response.text();
      setFileContent(text);
      if (resetSelectText.current) resetSelectText.current.value = "";
    } catch (error) {
      setError("Erro ao carregar o arquivo");
    }
  };

  const resetSelectFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  return (
    <div className="textReaderContainer">
      
      <div className="textReaderContainer__instructionsButtonContainer">
        <button
          className="textReaderContainer__instructionsButton"
          onClick={() => navigate("/instrucoes")}
          >
          {textReaderText.instructionsButton}
        </button>
      </div>

      <div className="textReaderContainer__fileUploader">
        <div className="textReaderContainer__fileUploader__text">
          {textReaderText.uploadText}{" "}
          <strong>{textReaderText.uploadText2}</strong>{" "}
          {textReaderText.uploadText3}
        </div>
        <div className="textReaderContainer__fileUploader__inputSelectGroup">
          <label
            htmlFor="upload-file"
            className="textReaderContainer__fileUploader__label"
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
          >
            <option value="" disabled>
              {textReaderText.placeholderSelectText}
            </option>
            {textReaderText.texts.map((text, index) => (
              <option key={index} value={text}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {fileName && (
        <p className="textReaderContainer__fileName">
          <strong>{textReaderText.fileText}</strong> {fileName}
        </p>
      )}

      <TextDisplay fileContent={fileContent} />

      

    </div>
  );
};

export default TextReader;
