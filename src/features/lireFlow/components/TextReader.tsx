import React, { useState } from "react";
import TextDisplay from "./TextDisplay.jsx";
import "../layout/textReaderStyle.css";
const TextReader = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1);

  const textReaderText = {
    uploadText: "Arraste o arquivo",
    uploadText2: ".txt",
    uploadText3: "até aqui ou ",
    lectureSpeed: "Velocidade de leitura",
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

  return (
    <div className="textReaderContainer">
      <div className="textReaderContainer__fileUploader">
        {textReaderText.uploadText}{" "}
        <strong>{textReaderText.uploadText2}</strong>{" "}
        {textReaderText.uploadText3}
        <label
          htmlFor="upload-file"
          className="textReaderContainer__fileUploader__label"
        >
          <strong>Selecionar arquivo</strong>
        </label>
        <input
          id="upload-file"
          type="file"
          onChange={selectedFile}
          className="textReaderContainer__fileUploader__input"
        />
      </div>

      {error && <p className="textReaderContainer__errorMessage">{error}</p>}

      {fileName && (
        <p className="textReaderContainer__fileName">
          <strong>Arquivo:</strong> {fileName}
        </p>
      )}

      <TextDisplay fileContent={fileContent} />
    </div>
  );
};

export default TextReader;
