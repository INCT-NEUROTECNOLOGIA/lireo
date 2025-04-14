import React, { useState } from "react";
import TextDisplay from "./TextDisplay.jsx";
import "../layout/textReaderStyle.css";
const TextReader = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1);

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
  const startButton = () => {
    //Start button logic
  };

  const pauseButton = () => {
    //Pause button logic
  };

  return (
    <>
      <div className="textReaderContainer">
        <div className="textReaderContainer__fileUploader" style={{ marginBottom: "20px" }}> 
          Arraste o arquivo <strong>.txt</strong> até aqui ou  
          <label htmlFor="upload-file" 
                 className="textReaderContainer__fileUploader__label"><strong>Selecionar arquivo</strong></label>
          <input id="upload-file" 
                 type="file" 
                 onChange={selectedFile} 
                 className="textReaderContainer__fileUploader__input"/>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {fileName && (
          <p className="textReaderContainer__fileName">
            <strong>Arquivo:</strong> {fileName}
          </p>
        )}

        <TextDisplay fileContent={fileContent} /> 

        {fileName && (
        <div className="textReaderContainer__controls">
          <div className="textReaderContainer__controls__speedSlider">
            <p>Velocidade de leitura:</p>
            <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                defaultValue="1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="textReaderContainer__controls__speedSlider__input"
              />
              <span className="textReaderContainer__controls__speedSlider__value">
                {speed.toFixed(1)}x
              </span>
            </div>
          <div className="textReaderContainer__controls__buttons">
            <button className="textReaderContainer__controls__buttons__startButton" onClick={startButton}>Start</button>
            <button className="textReaderContainer__controls__buttons__pauseButton" onClick={pauseButton}>Pause</button>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default TextReader;
