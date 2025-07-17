import React, { useRef, useReducer } from "react";
import TextDisplay from "./TextDisplay.jsx";
import Loading from "../../../utils/components/Loading.tsx";
import { getPublicAssetUrl } from "../../../utils/pathUtils.ts";
import "../layout/textReaderStyle.css";
import { ROUTE_PATHS } from "../../../config/routes.ts";

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
      "O Ratinho Rói-Rói (Leitura fácil)",
      "Conto ou não conto (Leitura média)",
      "A Cartomante (Leitura avançada)",
    ],
    fileText: "Arquivo:",
    newText: "Escolher um novo texto",
    summary: {
      title: "Inicie a atividade de leitura fluente",
      texts: [
        "O objetivo desta tarefa é treinar a fluência leitora, com foco no ritmo e na automatização da leitura.",
        "É possível carregar um arquivo no formato .txt ou escolher um dos textos disponíveis na plataforma.",
        "Durante a tarefa, o texto será exibido com marcações com destaque palavra por palavra, em um tempo que pode ser ajustado conforme a necessidade.",
      ],
      linkText: "Para mais informações, acesse o ",
      link: "Guia do Usuário.",
      linkRef: ROUTE_PATHS.USER_GUIDE,
    },
    erros: {
      fileType: "Selecione um arquivo de texto (.txt)",
      readError: "Erro ao ler o arquivo",
      decodeError: "Erro ao decodificar o arquivo. Tente outro arquivo.",
    },
  };

  const readFile = async (file: File) => {
    const isTxtFile = (fileType: string): boolean => fileType === "text/plain";

    if (!file) return;

    if (!isTxtFile(file.type)) {
      dispatch({
        type: "SET_ERROR",
        payload: textReaderText.erros.fileType,
      });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const encodings = ["utf-8", "iso-8859-1", "windows-1252"];
      let content = null;

      for (const encoding of encodings) {
        try {
          content = new TextDecoder(encoding, { fatal: true }).decode(buffer);
          break;
        } catch (e) {
          continue;
        }
      }

      if (!content) {
        dispatch({
          type: "SET_ERROR",
          payload: textReaderText.erros.decodeError,
        });
      } else {
        dispatch({
          type: "SET_FILE",
          payload: { name: file.name, content },
        });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: textReaderText.erros.readError });
    }
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
    <>
      <div
        className={
          "textReaderSummary" + (state.fileUploaderClose ? " hidden" : "")
        }
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
        {state.error && (
          <p className="textReaderContainer__error">{state.error}</p>
        )}
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
