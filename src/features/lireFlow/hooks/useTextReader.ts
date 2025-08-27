import { useReducer, useRef } from "react";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

enum ActionType {
  SET_FILE = "SET_FILE",
  SET_ERROR = "SET_ERROR",
  RESET = "RESET",
  SET_LOADING = "SET_LOADING",
  SET_DRAGGING = "SET_DRAGGING",
  SET_FILE_UPLOADER_CLOSE = "SET_FILE_UPLOADER_CLOSE",
}

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
  | { type: ActionType.SET_FILE; payload: { name: string; content: string } }
  | { type: ActionType.SET_ERROR; payload: string }
  | { type: ActionType.RESET }
  | { type: ActionType.SET_LOADING; payload: boolean }
  | { type: ActionType.SET_DRAGGING; payload: boolean }
  | { type: ActionType.SET_FILE_UPLOADER_CLOSE };

const readerReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_FILE:
      return {
        ...state,
        fileName: action.payload.name,
        fileContent: action.payload.content,
        error: "",
        isLoading: false,
        fileUploaderClose: true,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ActionType.RESET:
      return { ...initialState, isLoading: true };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionType.SET_DRAGGING:
      return { ...state, isDragging: action.payload };
    case ActionType.SET_FILE_UPLOADER_CLOSE:
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
      dispatch({
        type: ActionType.SET_ERROR,
        payload: "Selecione um arquivo de texto (.txt)",
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
          type: ActionType.SET_ERROR,
          payload: "Erro ao decodificar o arquivo. Tente outro arquivo.",
        });
      } else {
        dispatch({
          type: ActionType.SET_FILE,
          payload: { name: file.name, content },
        });
      }
    } catch {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: "Erro ao ler o arquivo",
      });
    }
  };

  const selectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.RESET });
    if (!event.target.files) return;
    readFile(event.target.files[0]);
  };

  const selectedText = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.RESET });
    try {
      const basePath = getPublicAssetUrl("texts/");
      const filePath = `${basePath}${event.target.value}.txt`;
      const response = await fetch(filePath);
      const text = await response.text();
      dispatch({
        type: ActionType.SET_FILE,
        payload: { name: event.target.value, content: text },
      });
      if (resetSelectText.current) resetSelectText.current.value = "";
    } catch {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: "Erro ao carregar o arquivo",
      });
    }
  };

  const resetSelectFile = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const dropFile = (event: React.DragEvent<HTMLDivElement>) => {
    dispatch({ type: ActionType.RESET });
    event.preventDefault();
    if (!event.dataTransfer.files.length) return;
    readFile(event.dataTransfer.files[0]);
  };

  const dragFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch({ type: ActionType.SET_DRAGGING, payload: true });
  };

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch({ type: ActionType.SET_DRAGGING, payload: false });
  };

  const handleFileUploader = () =>
    dispatch({ type: ActionType.SET_FILE_UPLOADER_CLOSE });

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
