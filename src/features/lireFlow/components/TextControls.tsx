import React, { RefObject, useState } from "react";
import "../layout/textControlsStyle.css";
import { calculateWordsPerMinute } from "./ReadingParameters";

const TextControls = ({
  speed,
  setSpeed,
  speedRef,
  wordsPerMinuteRef,
  startButton,
  pauseButton,
  restartButton,
}: {
  speed: number;
  setSpeed: (arg: number) => void;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
  startButton: () => void;
  pauseButton: () => void;
  restartButton: () => void;
}) => {
  const textControlsText = {
    placeholderSelectLevel: "Escolha um nível de leitura",
    levels: [
      "Nenhum",
      "Nível 1",
      "Nível 2",
      "Nível 3",
      "Nível 4",
      "Nível 5",
      "Nível 6",
      "Nível 7",
      "Nível 8",
    ],
    levelLegend: [
      "Nenhum",
      "2º ano",
      "3º ano",
      "4º ano",
      "5º ano",
      "6º ano",
      "7º ano",
      "8º ano",
      "9º ano",
    ],
    levelValue: [0, 44, 72, 80, 99, 114, 120, 121, 129],
    lectureSpeed: "Velocidade de leitura:",
    start: "Iniciar",
    pause: "Pausar",
    restart: "Reiniciar",
    wordPerMinute: " ppm",
    wordPerMinuteLegend: "Palavras por minuto",
  };

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

  return (
    <div className="textControls">
      <div className="textControls__speedControls">
        <select
          className="textControls__selectLevel"
          name="levels"
          id="levels"
          defaultValue=""
          onChange={selectedLevel}
          title={textControlsText.placeholderSelectLevel}
        >
          <option value="" disabled>
            {textControlsText.placeholderSelectLevel}
          </option>
          {textControlsText.levels.map((level, index) => (
            <option
              key={index}
              value={textControlsText.levelValue[index]}
              title={textControlsText.levelLegend[index]}
            >
              {level}
            </option>
          ))}
        </select>

        <div className="textControls__inputContainer">
          <div
            className="textControls__speedSlider"
            title={textControlsText.lectureSpeed}
          >
            <p>{textControlsText.lectureSpeed}</p>
            <div className="textControls__speedSlider__inputContainer">
              <input
                type="range"
                id="speedRange"
                name="speed"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={speedChange}
                className="textControls__speedSlider__input"
              />
              <span className="textControls__speedSlider__value">
                {speed.toFixed(1)}x
              </span>
            </div>
          </div>

          <div
            className="textControls__wordsPerMinute"
            title={textControlsText.wordPerMinuteLegend}
          >
            <i className="bi bi-clock"></i>
            <input
              id="wordsPerMinuteInput"
              name="wordsPerMinute"
              className="textControls__wordsPerMinute__input"
              value={wordsPerMinute}
              onChange={wordsPerMinuteInput}
            ></input>
            {textControlsText.wordPerMinute}
          </div>
        </div>
      </div>

      <div className="textControls__buttons">
        <button
          className="textControls__button start"
          onClick={startButton}
          title={textControlsText.start}
        >
          <i className="bi bi-play"></i>
          <span className="textControls__buttonText">
            {textControlsText.start}
          </span>
        </button>
        <button
          className="textControls__button pause"
          onClick={pauseButton}
          title={textControlsText.pause}
        >
          <i className="bi bi-pause"></i>
          <span className="textControls__buttonText">
            {textControlsText.pause}
          </span>
        </button>
        <button
          className="textControls__button restart"
          onClick={restartButton}
          title={textControlsText.restart}
        >
          <i className="bi bi-arrow-clockwise"></i>
          <span className="textControls__buttonText">
            {textControlsText.restart}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TextControls;
