import React, { RefObject, useState } from 'react';
import { calculateWordsPerMinute } from '../components/readingParameters';

export const useTextConstrols = ({
  setSpeed,
  speedRef,
  wordsPerMinuteRef,
  pauseButton,
}: {
  setSpeed: (arg: number) => void;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
  pauseButton: () => void;
}) => {
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(
    calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current),
  );

  const updateWordsPerMinute = () => {
    setWordsPerMinute(
      calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current),
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
    speedRef.current = value;
    updateWordsPerMinute();
    setSpeed(value);

    const min = parseFloat(event.target.min);
    const max = parseFloat(event.target.max);
    const percent = ((value - min) / (max - min)) * 100;
    event.target.style.setProperty('--progress', `${percent}%`);
  };

  const wordsPerMinuteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const wpm = parseInt(input);

    setWordsPerMinute(input === '' ? 0 : wpm);

    if (!isNaN(wpm) && wpm > 0) {
      const currentSpeed = speedRef.current ?? 1;
      const adjustedWpm = wpm / currentSpeed;

      wordsPerMinuteRef.current = adjustedWpm;
    }
  };

  return {
    wordsPerMinute,
    selectedLevel,
    speedChange,
    wordsPerMinuteInput,
  };
};
