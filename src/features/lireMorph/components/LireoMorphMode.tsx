import { lireMorphText } from "../texts/lireMorphText";

interface LireoMorphModeProps {
  choosenMode: string | null;
  selectedMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LireoMorphMode = ({ choosenMode, selectedMode }: LireoMorphModeProps) => {
  return (
    <div className="modeContainer">
      {lireMorphText.modes.map((mode, index) => {
        return (
          <label
            key={index}
            className={`checkboxLabel modeLabel ${
              choosenMode === mode ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              value={mode}
              checked={choosenMode === mode}
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
