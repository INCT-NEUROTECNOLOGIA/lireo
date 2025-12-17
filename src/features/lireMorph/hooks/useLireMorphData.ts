import { useEffect, useMemo, useState, useCallback, useRef } from "react";
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

      const usedPositions = existingAffixes.map((a) => a.position);
      const availablePositions = shuffleCells(cellsGrid).filter(
        (pos) => !usedPositions.some((used) => Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5)
      );

      const newAffixes = newTexts.map((text, i) => ({
        text,
        position: availablePositions[i] || shuffleCells(cellsGrid)[i],
      }));

      return [...existingAffixes, ...newAffixes];
    });
  }, [showPrefixes, showSuffixes, cellsGrid]);

  useEffect(() => {
    const currentRadical = selectedRadicalIndex === null ? lireMorphText.exemple : radicals[selectedRadicalIndex];
    updateAffixesBasedOnFilters(currentRadical.prefixes, currentRadical.suffixes);
    isInitialLoad.current = false;
  }, [selectedRadicalIndex, showPrefixes, showSuffixes, updateAffixesBasedOnFilters]);

  const selectRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRadicalIndex(parseInt(event.target.value));
    setSummaryClose(true);
  };

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