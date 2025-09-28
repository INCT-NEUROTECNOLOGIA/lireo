import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

interface LireoMorphRadicalSelectorProps {
  selectedRadical: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LireoMorphRadicalSelector = ({ selectedRadical }: LireoMorphRadicalSelectorProps) => {
    return (
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
    );
};

export default LireoMorphRadicalSelector;