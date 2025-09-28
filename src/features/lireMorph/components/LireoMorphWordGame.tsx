import { Affix } from "../types/Affix.type";
import LireoMorphAffix from "./LireoMorphAffix";


interface LireoMorphWordGameProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  radicalRef: React.RefObject<HTMLSpanElement | null>;
  targetAffixRef: React.RefObject<HTMLSpanElement | null>;
  radical: string;
    affixes: Affix[];
    dragState: React.RefObject<{
    currentIndex: number | null;
    isDragging: boolean;
    isFittedLeft: boolean;
    isFittedRight: boolean;
    offset: {
        x: number;
        y: number;
    };
}>;
  grabAffix: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => void;
}

const LireoMorphWordGame = ({
  containerRef,
  radicalRef,
  targetAffixRef,
  radical,
  affixes,
    dragState,
    grabAffix,
}: LireoMorphWordGameProps) => {
    return (
        <div className="wordsContainer" ref={containerRef}>
          <span className="radical" ref={radicalRef}>
            {radical}
          </span>

          {affixes.map((affix, index) => (
            <LireoMorphAffix
              key={index}
              index={index}
              affix={affix}
              dragState={dragState}
              grabAffix={grabAffix}
              targetAffixRef={targetAffixRef}
            />
          ))}
        </div>
    );
};

export default LireoMorphWordGame;