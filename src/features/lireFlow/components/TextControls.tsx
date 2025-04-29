import React, { RefObject } from "react";
import "../layout/textControlsStyle.css";

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
          onClick={startButton}
        >
          {textControlsText.start}
        </button>
        <button
          className="textControls__buttons__pauseButton"
          onClick={pauseButton}
        >
          {textControlsText.pause}
        </button>
        <button
          className="textControls__buttons__restartButton"
          onClick={restartButton}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
};

export default TextControls;
