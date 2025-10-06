import { useCallback, useEffect, useRef, useState } from "react";
import { PrefixEnum } from "../types/prefix.enum";
import { SuffixEnum } from "../types/suffix.enum";
import { Morph } from "../types/morph.type";
import { lireMorphText } from "../texts/lireMorphText";
import { MorphemicWord } from "../types/morphemicWord.type";
import { AffixCombination } from "../types/affixCombination.type";

interface useLireMorphFiltersProps {
  morphs: Morph[];
  selectedMorphIndex: number | null;
  morphema: MorphemicWord[] | AffixCombination[];
  cellsGrid: { x: number; y: number }[];
  shuffleCells: (
    cells: { x: number; y: number }[]
  ) => { x: number; y: number }[];
  isMorphemicWord: (
    word: MorphemicWord | AffixCombination
  ) => word is MorphemicWord;
  setMorphs: React.Dispatch<React.SetStateAction<Morph[]>>;
  setFittedMorph: React.Dispatch<
    React.SetStateAction<{ [key: number]: "left" | "right" | null }>
  >;
}

const useLireMorphFilters = ({
  morphs,
  selectedMorphIndex,
  morphema,
  cellsGrid,
  shuffleCells,
  isMorphemicWord,
  setMorphs,
  setFittedMorph,
}: useLireMorphFiltersProps) => {
  const [showPrefixes, setShowPrefixes] = useState<boolean>(true);
  const [showSuffixes, setShowSuffixes] = useState<boolean>(true);
  const previousRadicalIndex = useRef<number | null>(null);
  const previousShowPrefixes = useRef<boolean>(true);
  const previousShowSuffixes = useRef<boolean>(true);
  const isInitialLoad = useRef<boolean>(true);

  const _getVisiblemorph = (
    prefixes: PrefixEnum[],
    suffixes: SuffixEnum[]
  ): (PrefixEnum | SuffixEnum)[] => {
    let targetmorph: (PrefixEnum | SuffixEnum)[] = [];
    if (showPrefixes) {
      targetmorph = [...targetmorph, ...prefixes];
    }
    if (showSuffixes) {
      targetmorph = [...targetmorph, ...suffixes];
    }
    return targetmorph;
  };

  const _filtermorphThatWillBeVisible = (
    morphs: Morph[],
    targetmorph: (PrefixEnum | SuffixEnum | string)[]
  ): Morph[] => {
    return morphs.filter((Morph) => targetmorph.includes(Morph.text));
  };

  const _findmorphThatNeedToBeAdded = (
    existingmorph: Morph[],
    targetmorph: (PrefixEnum | SuffixEnum)[]
  ): (PrefixEnum | SuffixEnum)[] => {
    return targetmorph.filter(
      (text) => !existingmorph.some((Morph) => Morph.text === text)
    );
  };

  const _cleaningFittedMorph = useCallback(() => {
    setFittedMorph((prev) => {
      const newFittedMorph = { ...prev };
      Object.keys(newFittedMorph).forEach((key) => {
        const index = parseInt(key);
        if (index >= morphs.length) {
          delete newFittedMorph[index];
        }
      });
      return newFittedMorph;
    });
  }, [morphs.length]);

  const updatemorphBasedOnFilters = useCallback(
    (prefixes: PrefixEnum[], suffixes: SuffixEnum[]): void => {
      setMorphs((prevMorph) => {
        const targetmorph = _getVisiblemorph(prefixes, suffixes);

        const existingmorph = _filtermorphThatWillBeVisible(
          prevMorph,
          targetmorph
        );

        const newMorphTexts = _findmorphThatNeedToBeAdded(
          existingmorph,
          targetmorph
        );

        const usedPositions = existingmorph.map((Morph) => Morph.position);
        const DisablePositions = shuffleCells(cellsGrid).filter(
          (pos) =>
            !usedPositions.some(
              (used) =>
                Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5
            )
        );

        const newmorph = newMorphTexts.map((text, i) => ({
          text,
          position: DisablePositions[i] || shuffleCells(cellsGrid)[i],
        }));

        return [...existingmorph, ...newmorph];
      });

      _cleaningFittedMorph();
    },
    [showPrefixes, showSuffixes, cellsGrid, morphs.length]
  );

  const _updatemorphBasedOnFilters = useCallback(() => {
    if (selectedMorphIndex === null) {
      updatemorphBasedOnFilters(
        lireMorphText.exemple.prefixes,
        lireMorphText.exemple.suffixes
      );
    } else if (isMorphemicWord(morphema[selectedMorphIndex])) {
      updatemorphBasedOnFilters(
        morphema[selectedMorphIndex].prefixes,
        morphema[selectedMorphIndex].suffixes
      );
    }
  }, [selectedMorphIndex, updatemorphBasedOnFilters]);

  useEffect(() => {
    const radicalChanged = previousRadicalIndex.current !== selectedMorphIndex;
    const filtersChanged =
      previousShowPrefixes.current !== showPrefixes ||
      previousShowSuffixes.current !== showSuffixes;

    if (isInitialLoad.current || radicalChanged) {
      setFittedMorph({});
      _updatemorphBasedOnFilters();
      isInitialLoad.current = false;
    } else if (filtersChanged) {
      _updatemorphBasedOnFilters();
    }

    previousRadicalIndex.current = selectedMorphIndex;
    previousShowPrefixes.current = showPrefixes;
    previousShowSuffixes.current = showSuffixes;
  }, [
    selectedMorphIndex,
    showPrefixes,
    showSuffixes,
    updatemorphBasedOnFilters,
  ]);

  const togglePrefixes = () => {
    setShowPrefixes((prev) => !prev);
  };

  const toggleSuffixes = () => {
    setShowSuffixes((prev) => !prev);
  };

  return {
    showPrefixes,
    showSuffixes,
    togglePrefixes,
    toggleSuffixes,
  };
};

export default useLireMorphFilters;
