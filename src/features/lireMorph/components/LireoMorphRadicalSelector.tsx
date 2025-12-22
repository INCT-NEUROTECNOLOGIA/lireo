import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

interface LireoMorphRadicalSelectorProps {
  selectRadical: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LireoMorphRadicalSelector = ({ selectRadical }: LireoMorphRadicalSelectorProps) => {
    return (
        <select
          id="radicalSelect"
          name="radicalSelect"
          className="radicalSelect"
          defaultValue=""
          onChange={selectRadical}
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
    );
};

export default LireoMorphRadicalSelector;