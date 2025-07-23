import { RefObject } from "react";

export interface useTextControlsProps {
  wordsPerMinuteRef: RefObject<number>;
  speedRef: RefObject<number>;
  setSpeed: (arg: number) => void;
  pauseButton: () => void;
}

export interface TextControlsProps {
  wordsPerMinuteRef: RefObject<number>;
  speed: number;
  speedRef: RefObject<number>;
  setSpeed: (arg: number) => void;
  startButton: () => void;
  pauseButton: () => void;
  restartButton: () => void;
}
