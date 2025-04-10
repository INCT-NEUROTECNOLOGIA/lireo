import React, { useState } from "react";
import TextDisplay from "./TextDisplay.jsx";

const TextReader = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");

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
    <>
      <label htmlFor="upload-file">Selecionar arquivo</label>
      <input id="upload-file" type="file" onChange={selectedFile} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {fileName && (
        <p>
          <strong>Arquivo:</strong> {fileName}
        </p>
      )}

      <TextDisplay fileContent={fileContent} />
    </>
  );
};

export default TextReader;
