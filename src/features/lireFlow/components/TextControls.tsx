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
  setSpeed: (number) => void;
  speedRef: RefObject<number>;
  wordsPerMinuteRef: RefObject<number>;
  startButton: () => void;
  pauseButton: () => void;
  restartButton: () => void;
}) => {
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(
    calculateWordsPerMinute(
      wordsPerMinuteRef.current ?? 0,
      speedRef.current ?? 1
    )
  );

  const textControlsText = {
    placeholderSelectLevel: "Escolha um nível",
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
    levelValue: [120, 44, 72, 80, 99, 114, 120, 121, 129],
    lectureSpeed: "Velocidade de leitura:",
    start: "Iniciar",
    pause: "Pausar",
    restart: "Reiniciar",
    wordPerMinute: " ppm",
    wordPerMinuteLegend: "Palavras por minuto",
  };

  const selectedLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    wordsPerMinuteRef.current = Number(event.target.value);
    setWordsPerMinute(
      calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current)
    );
  };

  const speedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
    speedRef.current = parseFloat(event.target.value);
    setWordsPerMinute(
      calculateWordsPerMinute(wordsPerMinuteRef.current, speedRef.current)
    );
  };

  const wordsPerMinuteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const wpm = parseInt(input);

    setWordsPerMinute(input === "" ? 0 : wpm);

    if (!isNaN(wpm)) {
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
          <div className="textControls__speedSlider">
            <p>{textControlsText.lectureSpeed}</p>
            <div className="textControls__speedSlider__inputContainer">
              <input
                type="range"
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
          className="textControls__buttons__startButton"
          onClick={startButton}
          title={textControlsText.start}
        >
          {textControlsText.start}
        </button>
        <button
          className="textControls__buttons__pauseButton"
          onClick={pauseButton}
          title={textControlsText.pause}
        >
          {textControlsText.pause}
        </button>
        <button
          className="textControls__buttons__restartButton"
          onClick={restartButton}
          title={textControlsText.restart}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
};

export default TextControls;