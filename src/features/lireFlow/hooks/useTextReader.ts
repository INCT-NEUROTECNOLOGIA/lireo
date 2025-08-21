import { useReducer, useRef } from "react";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

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
      return { ...initialState, isLoading: true };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_DRAGGING":
      return { ...state, isDragging: action.payload };
    case "SET_FILE_UPLOADER_CLOSE":
      return { ...state, fileUploaderClose: !state.fileUploaderClose };
    default:
      return state;
  }
};

export const useTextReader = () => {
  const [state, dispatch] = useReducer(readerReducer, initialState);
  const resetSelectText = useRef<HTMLSelectElement>(null);

  const readFile = async (file: File) => {
    const isTxtFile = (fileType: string) => fileType === "text/plain";
    if (!file) return;

    if (!isTxtFile(file.type)) {
      dispatch({ type: "SET_ERROR", payload: "Selecione um arquivo de texto (.txt)" });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const encodings = ["utf-8", "windows-1252", "iso-8859-1"];
      let content = "";
      let decoded = false;

      for (const encoding of encodings) {
        try {
          content = new TextDecoder(encoding).decode(buffer);
          if (!content.includes("�")) {
            decoded = true;
            break;
          }
        } catch {}
      }

      if (!decoded) content = new TextDecoder("utf-8").decode(buffer);

      dispatch({ type: "SET_FILE", payload: { name: file.name, content } });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Erro ao ler o arquivo" });
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
      const basePath = getPublicAssetUrl("texts/");
      const filePath = `${basePath}${event.target.value}.txt`;
      const response = await fetch(filePath);
      const text = await response.text();
      dispatch({ type: "SET_FILE", payload: { name: event.target.value, content: text } });
      if (resetSelectText.current) resetSelectText.current.value = "";
    } catch {
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
    event.preventDefault();
    dispatch({ type: "SET_DRAGGING", payload: true });
  };

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch({ type: "SET_DRAGGING", payload: false });
  };

  const handleFileUploader = () => dispatch({ type: "SET_FILE_UPLOADER_CLOSE" });

  return {
    state,
    resetSelectText,
    selectedFile,
    selectedText,
    resetSelectFile,
    dropFile,
    dragFile,
    dragLeave,
    handleFileUploader,
  };
};
