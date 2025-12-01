import { lireMorphText } from '../texts/lireMorphText';
import { AffixCombination } from '../types/affixCombination.type';
import { MorphemicWord } from '../types/morphemicWord.type';

interface LireoMorphSelectorProps {
  selectedMorphIndex: number | null;
  morphema: MorphemicWord[] | AffixCombination[];
  chosenMode: string;
  selectMainMorph: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isMorphemicWord: (
    item: MorphemicWord | AffixCombination,
  ) => item is MorphemicWord;
}

const LireoMorphSelector = ({
  selectedMorphIndex,
  morphema,
  chosenMode,
  selectMainMorph,
  isMorphemicWord,
}: LireoMorphSelectorProps) => {
  return (
    <select
      id="morphSelect"
      name="morphSelect"
      className="morphSelect"
      value={selectedMorphIndex ?? ''}
      onChange={selectMainMorph}
      title={lireMorphText.placeholderSelect + chosenMode}
    >
      <option value="" disabled>
        {lireMorphText.placeholderSelect + chosenMode}
      </option>
      {morphema.map((item, index) => (
        <option
          key={index}
          value={index}
          title={isMorphemicWord(item) ? item.radical : item.affix}
        >
          {isMorphemicWord(item) ? item.radical : item.affix}
        </option>
      ))}
    </select>
  );
};

export default LireoMorphSelector;
