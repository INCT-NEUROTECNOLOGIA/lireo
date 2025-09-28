import "../layout/lireMorphStyle.css";
import useLireMorph from "../hooks/useLireMorph";
import LireoMorthInstructions from "./LireoMorthInstructions";
import LireoMorphRadicalSelector from "./LireoMorphRadicalSelector";
import LireoMorphWordGame from "./LireoMorphWordGame";

const LireMorph = () => {
  const {
    radical,
    affixes,
    summaryClose,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectedRadical,
    grabAffix,
  } = useLireMorph();

  return (
    <>
      <LireoMorthInstructions summaryClose={summaryClose} />
      <div className="lireMorphContainer">
        <LireoMorphRadicalSelector selectedRadical={selectedRadical} />

        <LireoMorphWordGame
          containerRef={containerRef}
          radicalRef={radicalRef}
          targetAffixRef={targetAffixRef}
          radical={radical}
          affixes={affixes}
          dragState={dragState}
          grabAffix={grabAffix}
        />
      </div>
    </>
  );
};

export default LireMorph;
