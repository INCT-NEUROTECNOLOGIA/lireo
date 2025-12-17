import { lireMorphText } from "../texts/lireMorphText";


interface LireoMorphModeProps {
  chosenMode: string | null;
  selectedMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LireoMorphMode = ({ chosenMode, selectedMode }: LireoMorphModeProps) => {
  return (
    <div className="modeContainer">
      {lireMorphText.modes.map((mode, index) => {
        return (
          <label
            key={index}
            className={`checkboxLabel modeLabel ${
              chosenMode === mode ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              id={mode}
              value={mode}
              checked={chosenMode === mode}
              className="modeCheckbox"
              onChange={selectedMode}
            />
            <span className="checkboxText">{mode}</span>
          </label>
        );
      })}
    </div>
  );
};

export default LireoMorphMode;
