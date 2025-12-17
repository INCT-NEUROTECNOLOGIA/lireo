<<<<<<< HEAD
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { radicals } from "../texts/radicals";
import { lireMorphText } from "../texts/lireMorphText";
import { Position } from "../types/position.type";
import { Affix } from "../types/Affix.type";
import { PrefixesEnum } from "../types/prefix.enum";
import { SuffixEnum } from "../types/suffix.enum";
=======
import { useEffect, useMemo, useState } from 'react';

import { prefixes } from '../texts/prefixes';
import { radicals } from '../texts/radicals';
import { suffixes } from '../texts/suffixes';
import { lireMorphText } from '../texts/lireMorphText';

import { MorphemicWord } from '../types/morphemicWord.type';
import { AffixCombination } from '../types/affixCombination.type';
import { Morph } from '../types/morph.type';
import { ModeEnum } from '../types/mode.enum';
import { Position } from '../types/position.type';

interface useLireMorphDataProps {
  setSummaryClose: React.Dispatch<React.SetStateAction<boolean>>;
}
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

const ROWS = 4;
const COLS = 4;
const FLUTTER = 5;

<<<<<<< HEAD
const useLireMorphData = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [selectedRadicalIndex, setSelectedRadicalIndex] = useState<number | null>(null);
  const [affixes, setAffixes] = useState<Affix[]>([]);
  const [showPrefixes, setShowPrefixes] = useState<boolean>(true);
  const [showSuffixes, setShowSuffixes] = useState<boolean>(true);
  const isInitialLoad = useRef<boolean>(true);
=======
const useLireMorphData = ({ setSummaryClose }: useLireMorphDataProps) => {
  const [morphs, setMorphs] = useState<Morph[]>([]);
  const [selectedMorphIndex, setSelectedMorphIndex] = useState<number | null>(
    null,
  );

  const [example, setExample] = useState<
    MorphemicWord | AffixCombination
  >(lireMorphText.example);

  const [morphema, setMorphema] = useState<
    MorphemicWord[] | AffixCombination[]
  >(radicals);

  const [chosenMode, setChosenMode] = useState<ModeEnum>(
    ModeEnum.RADICAL,
  );

  const [isPrefixesDisable, setIsPrefixesDisable] =
    useState<boolean>(false);

  const [isSuffixesDisable, setIsSuffixesDisable] =
    useState<boolean>(false);
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

  const cellsGrid = useMemo(() => {
    const cells: Position[] = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
<<<<<<< HEAD
        const cellX = (100 / COLS) * (col + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        const cellY = (100 / ROWS) * (row + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
=======
        const cellX =
          (100 / COLS) * (col + 0.5) +
          (Math.random() * 2 - 1) * FLUTTER;

        const cellY =
          (100 / ROWS) * (row + 0.5) +
          (Math.random() * 2 - 1) * FLUTTER;

>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453
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

<<<<<<< HEAD
  const selectedRadical = useMemo(() => {
    if (selectedRadicalIndex === null) return lireMorphText.exemple.radical;
    return radicals[selectedRadicalIndex].radical;
  }, [selectedRadicalIndex]);

  const updateAffixesBasedOnFilters = useCallback((prefixes: PrefixesEnum[], suffixes: SuffixEnum[]) => {
    setAffixes((prevAffixes) => {
      let targetTexts: (PrefixesEnum | SuffixEnum)[] = [];
      if (showPrefixes) targetTexts = [...targetTexts, ...prefixes];
      if (showSuffixes) targetTexts = [...targetTexts, ...suffixes];

      // Filtra os que já existem e ainda devem ser visíveis
      const existingAffixes = prevAffixes.filter((a) => targetTexts.includes(a.text as any));
      // Identifica o que precisa ser adicionado
      const newTexts = targetTexts.filter((t) => !existingAffixes.some((a) => a.text === t));
=======
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

  const selectMode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const mode = event.target.value;
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

      const usedPositions = existingAffixes.map((a) => a.position);
      const availablePositions = shuffleCells(cellsGrid).filter(
        (pos) => !usedPositions.some((used) => Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5)
      );

<<<<<<< HEAD
      const newAffixes = newTexts.map((text, i) => ({
        text,
        position: availablePositions[i] || shuffleCells(cellsGrid)[i],
      }));

      return [...existingAffixes, ...newAffixes];
    });
  }, [showPrefixes, showSuffixes, cellsGrid]);
=======
    switch (mode) {
      case ModeEnum.PREFIX:
        setMorphema(prefixes);
        setExample(lireMorphText.example);
        setMorphs(
          initializeMorphs(
            lireMorphText.example.suffixes,
          ),
        );
        break;

      case ModeEnum.RADICAL:
        setMorphema(radicals);
        setExample(lireMorphText.example);
        setMorphs(
          initializeMorphs(
            [
              ...(lireMorphText.example.prefixes || []),
              ...(lireMorphText.example.suffixes || []),
            ].map(String),
          ),
        );
        break;

      case ModeEnum.SUFFIX:
        setMorphema(suffixes);
        setExample(lireMorphText.example);
        setMorphs(
          initializeMorphs(
            lireMorphText.example.suffixes,
          ),
        );
        break;

      default:
        setMorphema([]);
    }
  };

  const selectMainMorph = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const index = parseInt(event.target.value);
    setSelectedMorphIndex(index);
    setSummaryClose(true);
  };

  const selectedMainMorph = useMemo(() => {
    if (selectedMorphIndex === null) {
      return isMorphemicWord(example)
        ? example.radical
        : example.affix;
    }

    const chosenMorph = morphema[selectedMorphIndex];

    return isMorphemicWord(chosenMorph)
      ? chosenMorph.radical
      : chosenMorph.affix;
  }, [selectedMorphIndex, morphema]);
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

  useEffect(() => {
    const currentRadical = selectedRadicalIndex === null ? lireMorphText.exemple : radicals[selectedRadicalIndex];
    updateAffixesBasedOnFilters(currentRadical.prefixes, currentRadical.suffixes);
    isInitialLoad.current = false;
  }, [selectedRadicalIndex, showPrefixes, showSuffixes, updateAffixesBasedOnFilters]);

<<<<<<< HEAD
  const selectRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRadicalIndex(parseInt(event.target.value));
    setSummaryClose(true);
  };
=======
    const chosenMorph = morphema[selectedMorphIndex];

    if (isMorphemicWord(chosenMorph)) {
      setIsPrefixesDisable(
        chosenMorph.prefixes.length === 0,
      );
      setIsSuffixesDisable(
        chosenMorph.suffixes.length === 0,
      );
    } else {
      setIsPrefixesDisable(true);
      setIsSuffixesDisable(true);
      setMorphs(
        initializeMorphs(chosenMorph.radicals),
      );
    }
  }, [selectedMorphIndex, morphema]);
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

  return {
    selectedRadical,
    selectedRadicalIndex,
    affixes,
    setAffixes,
    showPrefixes,
    showSuffixes,
    summaryClose,
    setSummaryClose,
    togglePrefixes: () => setShowPrefixes(!showPrefixes),
    toggleSuffixes: () => setShowSuffixes(!showSuffixes),
    selectRadical,
  };
};

export default useLireMorphData;