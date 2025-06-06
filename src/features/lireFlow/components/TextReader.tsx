import React, { useRef, useReducer } from "react";
import TextDisplay from "./TextDisplay.jsx";
import Loading from "../../../utils/components/Loading.tsx";
import { getPublicAssetUrl } from "../../../utils/pathUtils.ts";
import "../layout/textReaderStyle.css";

const TextReader = () => {
  type State = {
    fileName: string;
    fileContent: string;
    error: string;
    isDragging: boolean;
    isLoading: boolean;
    fileUploaderClose: boolean;
  };

  const initialState: State = {
    fileName: "",
    fileContent: "",
    error: "",
    isDragging: false,
    isLoading: false,
    fileUploaderClose: false,
  };

  type Action =
    | { type: "SET_FILE"; payload: { name: string; content: string } }
    | { type: "SET_ERROR"; payload: string }
    | { type: "RESET" }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_DRAGGING"; payload: boolean }
    | { type: "SET_FILE_UPLOADER_CLOSE" };

  const readerReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_FILE":
        return {
          ...state,
          fileName: action.payload.name,
          fileContent: action.payload.content,
          error: "",
          isLoading: false,
          fileUploaderClose: true,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case "RESET":
        return {
          ...initialState,
          isLoading: true,
        };
      case "SET_LOADING":
        return {
          ...state,
          isLoading: action.payload,
        };
      case "SET_DRAGGING":
        return {
          ...state,
          isDragging: action.payload,
        };
      case "SET_FILE_UPLOADER_CLOSE":
        return {
          ...state,
          fileUploaderClose: !state.fileUploaderClose,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(readerReducer, initialState);
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
      dispatch({
        type: "SET_ERROR",
        payload: "Selecione um arquivo de texto (.txt)",
      });
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsText(file);

    reader.onload = (): void => {
      if (typeof reader.result === "string") {
        dispatch({
          type: "SET_FILE",
          payload: { name: file.name, content: reader.result },
        });
      } else {
        dispatch({ type: "SET_ERROR", payload: "Erro ao ler o arquivo" });
      }
    };

    reader.onerror = (): void => {
      dispatch({ type: "SET_ERROR", payload: "Erro ao ler o arquivo" });
    };
  };

  const selectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "RESET" });

    if (!event.target.files) return;
    readFile(event.target.files[0]);
  };

  const selectedText = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "RESET" });

    try {
      let basePath = getPublicAssetUrl("texts/");
      const filePath = `${basePath}${event.target.value}.txt`;
      const response = await fetch(filePath);
      const text = await response.text();
      dispatch({
        type: "SET_FILE",
        payload: { name: event.target.value, content: text },
      });
      if (resetSelectText.current) resetSelectText.current.value = "";
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Erro ao carregar o arquivo" });
    }
  };

  const resetSelectFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: "RESET" });

    event.preventDefault();
    if (!event.dataTransfer.files.length) return;
    readFile(event.dataTransfer.files[0]);
  };

  const dragFile = (event: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_DRAGGING", payload: true });
    event.preventDefault();
  };

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: "SET_DRAGGING", payload: false });
    event.preventDefault();
  };

  const handleFileUploader = () =>
    dispatch({ type: "SET_FILE_UPLOADER_CLOSE" });

  return (
    <div className="textReaderContainer">
      {state.fileContent && (
        <button
          className="textReaderContainer__fileUploader__label"
          onClick={handleFileUploader}
        >
          Escolher um novo texto
        </button>
      )}
      <div
        className={
          "textReaderContainer__fileUploader" +
          (state.fileUploaderClose ? "" : " active")
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
        <p className="textReaderContainer__fileName">
          <strong>{textReaderText.fileText}</strong> {state.fileName}
        </p>
      )}

      {state.isLoading ? (
        <Loading />
      ) : (
        <TextDisplay fileContent={state.fileContent} />
      )}
    </div>
  );
};

export default TextReader;
