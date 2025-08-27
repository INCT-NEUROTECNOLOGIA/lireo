import "../layout/textControlsStyle.css";
import { TextControlsProps } from "../interfaces/ITextControls";
import useTextControls from "../hooks/useTextControls";
import { textControlsText } from "../texts/textControlsText";

const TextControls = ({
  wordsPerMinuteRef,
  speed,
  speedRef,
  setSpeed,
  startButton,
  pauseButton,
  restartButton,
}: TextControlsProps) => {
  const { wordsPerMinute, selectedLevel, speedChange, wordsPerMinuteInput } =
    useTextControls({ speedRef, wordsPerMinuteRef, setSpeed, pauseButton });

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
