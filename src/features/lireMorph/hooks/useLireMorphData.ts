import { useMemo, useState, useCallback, useRef } from "react";
import { radicals } from "../texts/radicals";
import { lireMorphText } from "../texts/lireMorphText";
import { Position } from "../types/position.type";
import { Affix } from "../types/Affix.type";
import { PrefixesEnum } from "../types/prefix.enum";
import { SuffixEnum } from "../types/suffix.enum";

const ROWS = 4;
const COLS = 4;
const FLUTTER = 5;

const useLireMorphData = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [selectedRadicalIndex, setSelectedRadicalIndex] = useState<number | null>(null);
  const [affixes, setAffixes] = useState<Affix[]>([]);
  const [showPrefixes, setShowPrefixes] = useState<boolean>(true);
  const [showSuffixes, setShowSuffixes] = useState<boolean>(true);
  const isInitialLoad = useRef<boolean>(true);

  const cellsGrid = useMemo(() => {
    const cells: Position[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellX = (100 / COLS) * (col + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        const cellY = (100 / ROWS) * (row + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
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

  const _getVisibleAffixes = (prefixes: PrefixesEnum[], suffixes: SuffixEnum[]): (PrefixesEnum | SuffixEnum)[] => {
    let targetAffixes: (PrefixesEnum | SuffixEnum)[] = [];
    if (showPrefixes) targetAffixes = [...targetAffixes, ...prefixes];
    if (showSuffixes) targetAffixes = [...targetAffixes, ...suffixes];
    return targetAffixes;
  };

  const _filterAffixesThatWillBeVisible = (affixes: Affix[], targetAffixes: (PrefixesEnum | SuffixEnum)[]): Affix[] => {
    return affixes.filter(affix => targetAffixes.includes(affix.text));
  };

  const _findAffixesThatNeedToBeAdded = (existingAffixes: Affix[], targetAffixes: (PrefixesEnum | SuffixEnum)[]): (PrefixesEnum | SuffixEnum)[] => {
    return targetAffixes.filter(text => !existingAffixes.some(affix => affix.text === text));
  };

  const updateAffixesBasedOnFilters = useCallback((prefixes: PrefixesEnum[], suffixes: SuffixEnum[]): void => {
    setAffixes(prevAffixes => {
      const targetAffixes = _getVisibleAffixes(prefixes, suffixes);
      const existingAffixes = _filterAffixesThatWillBeVisible(prevAffixes, targetAffixes);
      const newAffixTexts = _findAffixesThatNeedToBeAdded(existingAffixes, targetAffixes);
      
      const usedPositions = existingAffixes.map(affix => affix.position);
      const availablePositions = shuffleCells(cellsGrid).filter(pos => 
        !usedPositions.some(used => Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5)
      );

      const newAffixes = newAffixTexts.map((text, i) => ({
        text,
        position: availablePositions[i] || shuffleCells(cellsGrid)[i],
      }));

      return [...existingAffixes, ...newAffixes];
    });
  }, [showPrefixes, showSuffixes, cellsGrid]);

  const selectRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    setSelectedRadicalIndex(index);
    setSummaryClose(true);
  };

  const togglePrefixes = () => setShowPrefixes(prev => !prev);
  const toggleSuffixes = () => setShowSuffixes(prev => !prev);

  const selectedRadical = useMemo(() => {
    if (selectedRadicalIndex === null) return lireMorphText.example.radical;
    return radicals[selectedRadicalIndex].radical;
  }, [selectedRadicalIndex]);

  return {
    summaryClose,
    setSummaryClose,
    selectedRadicalIndex,
    selectedRadical,
    affixes,
    setAffixes,
    showPrefixes,
    showSuffixes,
    isInitialLoad,
    updateAffixesBasedOnFilters,
    selectRadical,
    togglePrefixes,
    toggleSuffixes,
  };
};

export default useLireMorphData;