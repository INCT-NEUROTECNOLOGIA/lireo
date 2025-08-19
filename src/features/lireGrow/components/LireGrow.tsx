import "../layout/lireGrowStyle.css";
import { lireGrowText } from "../texts/lireGrowText.ts";
import useLireGrow from "../hooks/useLireGrow.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils.ts";
import { ROUTE_PATHS } from "../../../config/routes.ts";

const LireGrow = () => {
  const {
    phrase,
    currentIndex,
    correctAnswer,
    shuffledImgsPaths,
    currentPartRef,
    chosenImg,
    summaryClose,
    fontSize,
    selectedPhrase,
    nextPart,
    selectedImg,
    checkAnswer,
    randomPhrase,
    fontSizeChange,
  } = useLireGrow();
  return (
    <>
      <div className={"taskSummary" + (summaryClose ? " hidden" : "")}>
        <h1>{lireGrowText.summary.title}</h1>
        <ul>
          {lireGrowText.summary.texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
          <li>
            {lireGrowText.summary.linkText}
            <a
              href={ROUTE_PATHS.USER_GUIDE_LIRE_GROW}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lireGrowText.summary.link}
            </a>
          </li>
        </ul>
      </div>

      <div className="lireGrowContainer">
        <div
          className="fontSizeAdjustment"
          title={lireGrowText.fontSizeAdjustment}
        >
          <p>{lireGrowText.fontSizeAdjustment}</p>
          <div className="fontSizeAdjustment__slider">
            <p className="fontSizeAdjustment__value">{fontSize}</p>
            <input
              type="range"
              min="10"
              max="64"
              step="1"
              value={fontSize}
              onChange={fontSizeChange}
              className="fontSizeAdjustment__input"
            />
          </div>
        </div>
        <div className="controls">
          <select
            className="selectPhrase"
            defaultValue=""
            onChange={selectedPhrase}
            title={lireGrowText.placeholderSelectPhrase}
          >
            <option value="" disabled>
              {lireGrowText.placeholderSelectPhrase}
            </option>
            {lireGrowText.phrases.map((phrase, index) => (
              <option key={index} value={phrase} title={phrase}>
                {phrase}
              </option>
            ))}
          </select>

          <button
            className="nextButton"
            onClick={nextPart}
            disabled={currentIndex > phrase.length}
            title={lireGrowText.nextPartButton}
          >
            {lireGrowText.nextPartButton}
          </button>
        </div>
        <div className="phraseContainer">
          {phrase.slice(0, currentIndex).map((_, index) => (
            <span key={index} ref={currentPartRef}>
              {phrase.slice(0, index + 1).join(" ")}
            </span>
          ))}
        </div>

        {currentIndex > phrase.length && (
          <div className="questionContainer">
            <p>{lireGrowText.imageSelectionMessage}</p>
            <div className="imgContainer">
              {shuffledImgsPaths.map((img, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="imgs"
                    id={img}
                    onChange={selectedImg}
                  />
                  <label htmlFor={img}>
                    <img
                      src={getPublicAssetUrl(img)}
                      alt={`${lireGrowText.imgAlt} ${index + 1}`}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {chosenImg && (
          <div className="result">
            {correctAnswer !== null && (
              <span
                className={`resultText ${
                  correctAnswer ? "correct" : "incorrect"
                }`}
              >
                {correctAnswer ? lireGrowText.correct : lireGrowText.incorrect}
              </span>
            )}

            {correctAnswer ? (
              <button className="nextButton" onClick={randomPhrase}>
                {lireGrowText.nextPhraseButton}
              </button>
            ) : (
              <button className="checkButton" onClick={checkAnswer}>
                {lireGrowText.checkButton}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LireGrow;
