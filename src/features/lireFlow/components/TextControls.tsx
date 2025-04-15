import React from "react";
import "../layout/textControlsStyle.css";

const TextControls = ({
  speed,
  setSpeed,
  startButton,
  pauseButton,
}: {
  speed: number;
  setSpeed: (number) => void;
  startButton: () => void;
  pauseButton: () => void;
}) => {
  const textControlsText = {
    lectureSpeed: "Velocidade de leitura:",
    start: "Iniciar",
    pause: "Pausar",
  };
  return (
    <div className="textControls">
      <div className="textControls__speedSlider">
        <p>{textControlsText.lectureSpeed}</p>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={speed}
          onChange={(event) => setSpeed(parseFloat(event.target.value))}
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
      </div>
    </div>
  );
};

export default TextControls;
