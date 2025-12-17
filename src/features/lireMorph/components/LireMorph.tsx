import "../layout/lireMorphStyle.css";
import useLireMorph from "../hooks/useLireMorph";
import LireoMorthInstructions from "./LireoMorthInstructions";
import LireoMorphRadicalSelector from "./LireoMorphRadicalSelector";
import LireoMorphWordGame from "./LireoMorphWordGame";
import LireoMorphAffixFilters from "./LireoMorphAffixFilters";


const LireMorph = () => {
  const {
    selectedRadical,
    affixes,
    summaryClose,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    showPrefixes,
    showSuffixes,
    fittedAffixes,
    selectRadical,
    grabAffix,
    togglePrefixes,
    toggleSuffixes,
  } = useLireMorph();

  return (
    <>
      <LireoMorthInstructions summaryClose={summaryClose} />
      <div className="lireMorphContainer">
        <div className="selectorAndFiltersContainer">
          <LireoMorphRadicalSelector selectRadical={selectRadical} />
          <LireoMorphAffixFilters
            showPrefixes={showPrefixes}
            showSuffixes={showSuffixes}
            togglePrefixes={togglePrefixes}
            toggleSuffixes={toggleSuffixes}
          />
        </div>

        <LireoMorphWordGame
          containerRef={containerRef}
          radicalRef={radicalRef}
          targetAffixRef={targetAffixRef}
          selectedRadical={selectedRadical}
          affixes={affixes}
          dragState={dragState}
          fittedAffixes={fittedAffixes}
          grabAffix={grabAffix}
        />
      </div>
    </>
  );
};

export default LireMorph;