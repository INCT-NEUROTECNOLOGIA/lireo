import "../layout/lireMorphStyle.css";
import { ROUTE_PATHS } from "../../../config/routes";
import useLireMorph from "../hooks/useLireMorph";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

const LireMorph = () => {
  const { radical, prefixes, summaryClose, selectedRadical } = useLireMorph();

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

        <span className="radical">{radical}</span>

        {prefixes.map((prefix, index) => (
          <span
            key={index}
            className="prefix"
            style={{
              top: `${prefix.positionTop}%`,
              left: `${prefix.positionLeft}%`,
            }}
          >
            {prefix.text}
          </span>
        ))}
      </div>
    </>
  );
};

export default LireMorph;
