import "../layout/lireGrowStyle.css";
import { LireGrowText } from "../texts/lireGrowText.ts";
import useLireGrow from "../hooks/useLireGrow.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils.ts";

const LireGrow = () => {
  const {
    phrase,
    currentIndex,
    correctAnswer,
    shuffledImgsPaths,
    currentPartRef,
    chosenImg,
    selectedPhrase,
    nextPart,
    selectedImg,
    checkAnswer,
  } = useLireGrow();
  return (
    <>
      <div className={"taskSummary"}>
        <h1>{LireGrowText.summary.title}</h1>
        <ul>
          {LireGrowText.summary.texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
          <li>
            {LireGrowText.summary.linkText}
            <a
              href={LireGrowText.summary.linkRef}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LireGrowText.summary.link}
            </a>
          </li>
        </ul>
      </div>

      <div className="lireGrowContainer">
        <div className="controls">
          <select
            className="selectPhrase"
            defaultValue=""
            onChange={selectedPhrase}
            title={LireGrowText.placeholderSelectPhrase}
          >
            <option value="" disabled>
              {LireGrowText.placeholderSelectPhrase}
            </option>
            {LireGrowText.phrases.map((phrase, index) => (
              <option key={index} value={phrase} title={phrase}>
                {phrase}
              </option>
            ))}
          </select>

          <button
            className="nextPartButton"
            onClick={nextPart}
            disabled={currentIndex >= phrase.length}
            title={LireGrowText.nextPartButton}
          >
            {LireGrowText.nextPartButton}
          </button>
        </div>
        <div className="phraseContainer">
          {phrase.slice(0, currentIndex).map((_, index) => (
            <span ref={currentPartRef}>
              {phrase.slice(0, index + 1).join(" ")}
            </span>
          ))}
        </div>

        {currentIndex === phrase.length && (
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
                    alt={`${LireGrowText.imgAlt} ${index + 1}`}
                  />
                </label>
              </div>
            ))}
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
                {correctAnswer ? LireGrowText.correct : LireGrowText.incorrect}
              </span>
            )}

            <button className="checkButton" onClick={checkAnswer}>
              {LireGrowText.checkButton}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LireGrow;
