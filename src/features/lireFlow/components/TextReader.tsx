import React, { useState, useRef } from "react";
import TextDisplay from "./TextDisplay.jsx";
import "../layout/textReaderStyle.css";

const TextReader = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resetSelectText = useRef<HTMLSelectElement>(null);

  const textReaderText = {
    uploadText: "Arraste o arquivo",
    uploadText2: ".txt",
    uploadText3: "até aqui ou ",
    uploadText4: "Selecione um arquivo",
    uploadText5: " ou ",
    placeholderSelectText: "Selecione um dos textos",
    texts: [
      "No Reino das Letras Felizes (Leitura fácil)",
      "O Ratinho Rói-Rói (Leitura fácil)",
      "Conto ou não conto (Leitura média)",
      "A Cartomante (Leitura avançada)",
    ],
    fileText: "Arquivo:",
  };

  const readFile = (file: File) => {
    const isTxtFile = (fileType: string): boolean => fileType === "text/plain";

    if (!file) return;

    if (!isTxtFile(file.type)) {
      setError("Selecione um arquivo de texto (.txt)");
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = (): void => {
      setIsLoading(false);
      if (typeof reader.result === "string") {
        setFileName(file.name);
        setFileContent(reader.result);
        setError("");
      } else {
        setError("Erro ao ler o arquivo");
      }
    };

    reader.onerror = (): void => {
      setIsLoading(false);
      setError("Erro ao ler o arquivo");
    };
  };

  const selectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName("");
    setFileContent("");
    setError("");

    if (!event.target.files) return;
    setIsLoading(true);
    readFile(event.target.files[0]);
  };

  const selectedText = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFileName(event.target.value);
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/texts/${event.target.value}.txt`);
      const text = await response.text();
      setFileContent(text);
      if (resetSelectText.current) resetSelectText.current.value = "";
      setIsLoading(false);
    } catch (error) {
      setError("Erro ao carregar o arquivo");
    }
  };

  const resetSelectFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    setFileName("");
    setFileContent("");
    setError("");
    setIsLoading(true);
    setIsDragging(false);

    event.preventDefault();
    if (!event.dataTransfer.files.length) return;
    readFile(event.dataTransfer.files[0]);
  };

  const dragFile = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    event.preventDefault();
  };

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    event.preventDefault();
  };

  return (
    <div className="textReaderContainer">
      <div
        className="textReaderContainer__fileUploader"
        onDrop={dropFile}
        onDragOver={dragFile}
        onDragLeave={dragLeave}
        style={{ backgroundColor: isDragging ? "#c7fff8" : "#ebfcf9" }}
      >
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

      {isLoading ? (
        <div className="loadingSpinner-container">
          <div className="loadingSpinner" />
          <span>Carregando...</span>
        </div>
      ) : (
        <TextDisplay fileContent={fileContent} />
      )}
    </div>
  );
};

export default TextReader;
