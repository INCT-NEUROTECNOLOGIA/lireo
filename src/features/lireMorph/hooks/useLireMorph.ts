import { useState } from "react";
import useLireMorphFilters from "./useLireMorphFilters";
import useLireMorphMove from "./useLireMorphMove";
import useLireMorphData from "./useLireMorphData";

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);

  const {
    morphema,
    morphs,
    selectedMorphIndex,
    selectedMainMorph,
    choosenMode,
    isPrefixesDisable,
    isSuffixesDisable,
    cellsGrid,
    shuffleCells,
    setMorphs,
    isMorphemicWord,
    selectMode,
    selectMainMorph,
  } = useLireMorphData({ setSummaryClose });

  const {
    dragState,
    mainMorphRef,
    containerRef,
    targetMorphRef,
    fittedMorph,
    grabMorph,
    setFittedMorph,
  } = useLireMorphMove({ setMorphs });

  const { showPrefixes, showSuffixes, togglePrefixes, toggleSuffixes } =
    useLireMorphFilters({
      morphs,
      selectedMorphIndex,
      morphema,
      cellsGrid,
      shuffleCells,
      isMorphemicWord,
      setMorphs,
      setFittedMorph,
    });

  return {
    summaryClose,
    morphs,
    morphema,
    selectedMorphIndex,
    selectedMainMorph,
    choosenMode,
    isPrefixesDisable,
    isSuffixesDisable,
    dragState,
    mainMorphRef,
    containerRef,
    targetMorphRef,
    fittedMorph,
    showPrefixes,
    showSuffixes,
    isMorphemicWord,
    selectMode,
    selectMainMorph,
    grabMorph,
    togglePrefixes,
    toggleSuffixes,
  };
};

export default useLireMorph;
