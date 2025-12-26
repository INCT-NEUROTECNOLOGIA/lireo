import { useEffect, useMemo, useState } from 'react';
import { prefixes } from '../texts/prefixes';
import { radicals } from '../texts/radicals';
import { suffixes } from '../texts/suffixes';
import { MorphemicWord } from '../types/morphemicWord.type';
import { AffixCombination } from '../types/affixCombination.type';
import { lireMorphText } from '../texts/lireMorphText';
import { Morph } from '../types/morph.type';
import { ModeEnum } from '../types/mode.enum';
import { Position } from '../types/position.type';

interface useLireMorphDataProps {
  setSummaryClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ROWS = 4;
const COLS = 4;
const FLUTTER = 5;

const useLireMorphData = ({ setSummaryClose }: useLireMorphDataProps) => {
  const [morphs, setMorphs] = useState<Morph[]>([]);
  const [selectedMorphIndex, setSelectedMorphIndex] = useState<number | null>(
    null,
  );
  const [example, setExample] = useState<MorphemicWord | AffixCombination>(
    lireMorphText.radicalExample,
  );
  const [morphema, setMorphema] = useState<
    MorphemicWord[] | AffixCombination[]
  >(radicals);
  const [chosenMode, setChosenMode] = useState<ModeEnum>(ModeEnum.RADICAL);
  const [isPrefixesDisable, setIsPrefixesDisable] = useState<boolean>(false);
  const [isSuffixesDisable, setIsSuffixesDisable] = useState<boolean>(false);

  const cellsGrid = useMemo(() => {
    const cells: Position[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellX =
          (100 / COLS) * (col + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        const cellY =
          (100 / ROWS) * (row + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        cells.push({ x: cellX, y: cellY });
      }
    }
    return cells;
  }, []);

  const shuffleCells = (cells: Position[]) => {
    const shuffled = [...cells];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const isMorphemicWord = (
    item: MorphemicWord | AffixCombination,
  ): item is MorphemicWord => {
    return 'radical' in item;
  };

  const initializeMorphs = (morphs: string[]): Morph[] => {
    const shuffled = shuffleCells(cellsGrid);
    return morphs.map((text, i) => ({
      text,
      position: shuffled[i],
    }));
  };

  const selectMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;

    setChosenMode(mode as ModeEnum);
    setSelectedMorphIndex(null);

    switch (mode) {
      case ModeEnum.PREFIX:
        setMorphema(prefixes);
        setExample(lireMorphText.prefixExample);
        setMorphs(initializeMorphs(lireMorphText.prefixExample.radicals));
        break;
      case ModeEnum.RADICAL:
        setMorphema(radicals);
        setExample(lireMorphText.radicalExample);
        setMorphs(
          initializeMorphs(
            [
              ...(lireMorphText.radicalExample.prefixes || []),
              ...(lireMorphText.radicalExample.suffixes || []),
            ].map(String),
          ),
        );
        break;
      case ModeEnum.SUFFIX:
        setMorphema(suffixes);
        setExample(lireMorphText.suffixExample);
        setMorphs(initializeMorphs(lireMorphText.suffixExample.radicals));
        break;
      default:
        setMorphema([]);
    }
  };

  const selectMainMorph = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    setSelectedMorphIndex(index);
    setSummaryClose(true);
  };

  const selectedMainMorph = useMemo(() => {
    if (selectedMorphIndex === null)
      return isMorphemicWord(example) ? example.radical : example.affix;

    const chosenMorph = morphema[selectedMorphIndex];
    return isMorphemicWord(chosenMorph)
      ? chosenMorph.radical
      : chosenMorph.affix;
  }, [selectedMorphIndex, morphema]);

  useEffect(() => {
    if (selectedMorphIndex === null) {
      setIsPrefixesDisable(false);
      setIsSuffixesDisable(false);
      return;
    }

    const chosenMorph = morphema[selectedMorphIndex];
    if (isMorphemicWord(chosenMorph)) {
      setIsPrefixesDisable(chosenMorph.prefixes.length === 0);
      setIsSuffixesDisable(chosenMorph.suffixes.length === 0);
    } else {
      setIsPrefixesDisable(true);
      setIsSuffixesDisable(true);
      setMorphs(initializeMorphs(chosenMorph.radicals));
    }
  }, [selectedMorphIndex, morphema]);

  return {
    morphema,
    morphs,
    selectedMorphIndex,
    selectedMainMorph,
    chosenMode,
    isPrefixesDisable,
    isSuffixesDisable,
    cellsGrid,
    example,
    shuffleCells,
    setMorphs,
    isMorphemicWord,
    selectMode,
    selectMainMorph,
  };
};

export default useLireMorphData;
