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
      example,
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
    chosenMode,
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
