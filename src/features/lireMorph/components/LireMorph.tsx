import "../layout/lireMorphStyle.css";
import useLireMorph from "../hooks/useLireMorph";
import LireoMorthInstructions from "./LireoMorthInstructions";
import LireoMorphSelector from "./LireoMorphSelector";
import LireoMorphWordGame from "./LireoMorphWordGame";
import LireoMorphAffixFilters from "./LireoMorphAffixFilters";
import LireoMorphMode from "./LireoMorphMode";

const LireMorph = () => {
  const {
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
  } = useLireMorph();

  return (
    <>
      <LireoMorthInstructions summaryClose={summaryClose} />
      <div className="lireMorphContainer">
        <LireoMorphMode choosenMode={choosenMode} selectedMode={selectMode} />
        <div className="selectorAndFiltersContainer">
          <LireoMorphSelector
            selectedMorphIndex={selectedMorphIndex}
            morphema={morphema}
            selectMainMorph={selectMainMorph}
            choosenMode={choosenMode}
            isMorphemicWord={isMorphemicWord}
          />
          {choosenMode === "radical" && (
            <LireoMorphAffixFilters
              showPrefixes={showPrefixes}
              showSuffixes={showSuffixes}
              isPrefixesDisable={isPrefixesDisable}
              isSuffixesDisable={isSuffixesDisable}
              togglePrefixes={togglePrefixes}
              toggleSuffixes={toggleSuffixes}
            />
          )}
        </div>

        <LireoMorphWordGame
          containerRef={containerRef}
          mainMorphRef={mainMorphRef}
          targetMorphRef={targetMorphRef}
          selectedMainMorph={selectedMainMorph}
          morphs={morphs}
          dragState={dragState}
          fittedMorph={fittedMorph}
          grabMorph={grabMorph}
        />
      </div>
    </>
  );
};

export default LireMorph;
