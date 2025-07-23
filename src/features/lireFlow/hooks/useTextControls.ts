import React, { useState } from "react";
import useReadingParameters from "../hooks/useReadingParameters";
import { useTextControlsProps } from "../interfaces/ITextControls";

const useTextControls = ({
  speedRef,
  wordsPerMinuteRef,
  setSpeed,
  pauseButton,
}: useTextControlsProps) => {
  const { calculateWordsPerMinute } = useReadingParameters();
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(
    calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current)
  );

  const updateWordsPerMinute = () => {
    setWordsPerMinute(
      calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current)
    );
  };

  const selectedLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    wordsPerMinuteRef.current = value;
    updateWordsPerMinute();
    if (value === 0) pauseButton();
  };

  const speedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setSpeed(value);
    speedRef.current = value;
    updateWordsPerMinute();

    const min = parseFloat(event.target.min);
    const max = parseFloat(event.target.max);
    const percent = ((value - min) / (max - min)) * 100;
    event.target.style.setProperty("--progress", `${percent}%`);
  };

  const wordsPerMinuteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const wpm = parseInt(input);

    setWordsPerMinute(input === "" ? 0 : wpm);

    if (!isNaN(wpm) && wpm > 0) {
      wordsPerMinuteRef.current = wpm;
    }
  };

  return {
    wordsPerMinute,
    selectedLevel,
    speedChange,
    wordsPerMinuteInput,
  };
};

export default useTextControls;
