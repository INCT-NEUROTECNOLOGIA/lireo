import React, { useState, useEffect, RefObject } from "react";
import "../layout/textControlsStyle.css";
import { classifyPerformance } from "./ReadingParameters";

interface Results {
  elapsedTime: number;
  totalWords: number;
  performance: string;
}

const TextControls = ({
  speed,
  setSpeed,
  speedRef,
  gradeRef,
  startButton,
  pauseButton,
  restartButton,
}: {
  speed: number;
  setSpeed: (number) => void;
  speedRef: RefObject<number>;
  gradeRef: RefObject<number>;
  startButton: () => void;
  pauseButton: () => void;
  restartButton: () => void;
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    if (isRunning) {
      timer = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timer !== undefined) {
      window.clearInterval(timer);
    }
    return () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    startButton();
  };

  const handlePause = () => {
    setIsRunning(false);
    const wordsReadPerMinute = calculateWordsPerMinute();
    const grade = gradeRef.current || 0;
    const performance = classifyPerformance(wordsReadPerMinute, grade) || "Desempenho não disponível";
    console.log("Performance:", performance);
    pauseButton();
  };

  const handleRestart = () => {
    setIsRunning(false);
    const wordsReadPerMinute = calculateWordsPerMinute();
    const grade = gradeRef.current || 0;
    const performance = classifyPerformance(wordsReadPerMinute, grade) || "Desempenho não disponível";
    console.log("Performance:", performance);
    setElapsedTime(0);
    setTimeout(() => setIsRunning(true), 0);
    restartButton();
  };

  const handleTextEnd = () => {
    setIsRunning(false);
    const wordsReadPerMinute = calculateWordsPerMinute();
    const grade = gradeRef.current || 0;
    const performance = classifyPerformance(wordsReadPerMinute, grade) || "Desempenho não disponível";
    const totalWords = document.querySelectorAll(".textContainer__text-paragraph span, .textContainer__text-paragraph mark").length;
    setResults({
      elapsedTime,
      totalWords,
      performance,
    });
  };

  const calculateWordsPerMinute = () => {
    const totalWords = document.querySelectorAll(".textContainer__text-paragraph span, .textContainer__text-paragraph mark").length;
    return elapsedTime > 0 ? (totalWords / elapsedTime) * 60 : 0;
  };

  useEffect(() => {
    const paragraphs = document.querySelectorAll(".textContainer__text-paragraph");
    const allTextRead = Array.from(paragraphs).every((paragraph) => {
      return paragraph.textContent?.trim() === "";
    });

    if (allTextRead) {
      handleTextEnd();
    }
  }, [elapsedTime]);

  const textControlsText = {
    placeholderSelectGrade: "Selecione o ano escolar",
    grades: [
      "2º ano",
      "3º ano",
      "4º ano",
      "5º ano",
      "6º ano",
      "7º ano",
      "8º ano",
      "9º ano",
    ],
    lectureSpeed: "Velocidade de leitura:",
    start: "Iniciar",
    pause: "Pausar",
  };

  return (
    <div className="textControls">
      <div className="textControls__selectGrade">
        <select
          className="textControls__selectGrade__select"
          name="grades"
          id="grades"
          defaultValue=""
          onChange={(event) => (gradeRef.current = Number(event.target.value))}
        >
          <option value="" disabled>
            {textControlsText.placeholderSelectGrade}
          </option>
          {textControlsText.grades.map((grade, index) => (
            <option key={index} value={index + 2}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="textControls__speedSlider">
        <p>{textControlsText.lectureSpeed}</p>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={speed}
          onChange={(event) => {
            setSpeed(parseFloat(event.target.value));
            speedRef.current = parseFloat(event.target.value);
          }}
          className="textControls__speedSlider__input"
        />
        <span className="textControls__speedSlider__value">
          {speed.toFixed(1)}x
        </span>
      </div>

      <div className="textControls__buttons">
        <button
          className="textControls__buttons__startButton"
          onClick={handleStart}
        >
          {textControlsText.start}
        </button>
        <button
          className="textControls__buttons__pauseButton"
          onClick={handlePause}
        >
          {textControlsText.pause}
        </button>
        <button
          className="textControls__buttons__restartButton"
          onClick={handleRestart}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

      <div className="textControls__timer">
        <p>Tempo decorrido: {elapsedTime}s</p>
      </div>

      {results && (
        <div className="textControls__results">
          <p>Tempo total: {results.elapsedTime}s</p>
          <p>Quantidade de palavras: {results.totalWords}</p>
          <p>Resultado: {results.performance}</p>
        </div>
      )}
    </div>
  );
};

export default TextControls;
