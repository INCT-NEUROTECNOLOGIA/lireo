import "../layout/lireGrowStyle.css";
import { LireGrowText } from "../texts/lireGrowText.ts";
import useLireGrow from "../hooks/useLireGrow.ts";
import { getPublicAssetUrl } from "../../../utils/pathUtils.ts";

const LireGrow = () => {
  const {
    currentPartRef,
    phrase,
    currentIndex,
    selectedPhrase,
    nextPart,
    imgsPaths,
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
            {imgsPaths(phrase).map((img, index) => (
              <img
                key={index}
                src={getPublicAssetUrl(img)}
                alt={`${LireGrowText.img} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LireGrow;
