import "../layout/lireMorphStyle.css";
import { ROUTE_PATHS } from "../../../config/routes";
import useLireMorph from "../hooks/useLireMorph";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

const LireMorph = () => {
  const {
    radical,
    affixes,
    currentIndex,
    summaryClose,
    isDragging,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectedRadical,
    grabAffix,
  } = useLireMorph();

  return (
    <>
      <div className={"taskSummary" + (summaryClose ? " hidden" : "")}>
        <h1>{lireMorphText.summary.title}</h1>
        <ul>
          {lireMorphText.summary.texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
          <li>
            {lireMorphText.summary.linkText}
            <a
              href={ROUTE_PATHS.USER_GUIDE_LIRE_GROW}
              target="_blank"
              rel="noopener noreferrer"
            >
              {lireMorphText.summary.link}
            </a>
          </li>
        </ul>
      </div>

      <div className="lireMorphContainer">
        <select
          id="radicalSelect"
          name="radicalSelect"
          className="radicalSelect"
          defaultValue=""
          onChange={selectedRadical}
          title={lireMorphText.placeholderSelectRadical}
        >
          <option value="" disabled>
            {lireMorphText.placeholderSelectRadical}
          </option>
          {radicals.map((item, index) => (
            <option key={index} value={index} title={item.radical}>
              {item.radical}
            </option>
          ))}
        </select>

        <div className="wordsContainer" ref={containerRef}>
          <span className="radical" ref={radicalRef}>
            {radical}
          </span>

          {affixes.map((affix, index) => (
            <span
              key={index}
              className={
                "affix" +
                (index == currentIndex.current && isDragging.current
                  ? " dragging"
                  : "")
              }
              style={{
                left: `${affix.position.x}%`,
                top: `${affix.position.y}%`,
              }}
              onMouseDown={(e) => grabAffix(e, index)}
              ref={
                index == currentIndex.current && isDragging.current
                  ? targetAffixRef
                  : null
              }
            >
              {affix.text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default LireMorph;
