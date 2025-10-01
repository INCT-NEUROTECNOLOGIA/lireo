import "../layout/lireMorphStyle.css";
import useLireMorph from "../hooks/useLireMorph";
import LireoMorthInstructions from "./LireoMorthInstructions";
import LireoMorphRadicalSelector from "./LireoMorphRadicalSelector";
import LireoMorphWordGame from "./LireoMorphWordGame";

const LireMorph = () => {
  const {
    selectedRadical,
    affixes,
    summaryClose,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectRadical,
    grabAffix,
  } = useLireMorph();

  return (
    <>
      <LireoMorthInstructions summaryClose={summaryClose} />
      <div className="lireMorphContainer">
        <LireoMorphRadicalSelector selectRadical={selectRadical} />

        <LireoMorphWordGame
          containerRef={containerRef}
          radicalRef={radicalRef}
          targetAffixRef={targetAffixRef}
          selectedRadical={selectedRadical}
          affixes={affixes}
          dragState={dragState}
          grabAffix={grabAffix}
        />
      </div>
    </>
  );
};

export default LireMorph;
