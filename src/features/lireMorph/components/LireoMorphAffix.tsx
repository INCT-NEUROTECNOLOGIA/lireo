import { Affix } from "../types/Affix.type";


interface LireoMorphAffixProps {
  index: number;
  affix: Affix;
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
  targetAffixRef: React.RefObject<HTMLSpanElement | null>;
}

const LireoMorphAffix = ({ index, affix, dragState, grabAffix, targetAffixRef }: LireoMorphAffixProps) => {
    const leftPosition = `${affix.position.x}%`;
    const topPosition = `${affix.position.y}%`;

    const isDragging = index === dragState.current.currentIndex &&
                dragState.current.isDragging;
    const isFittedLeft = index === dragState.current.currentIndex &&
                dragState.current.isFittedLeft;
    const isFittedRight = index === dragState.current.currentIndex &&
                dragState.current.isFittedRight;

    const classType = () =>{
        if(isDragging) return " dragging";
        if(isFittedLeft) return " fitLeft";
        if(isFittedRight) return " fitRight";
        return "";
    };

    return (<span
              key={index}
              className={
                "affix" + classType()
              }
              style={{
                left: leftPosition,
                top: topPosition,
              }}
              onMouseDown={(e) => grabAffix(e, index)}
              ref={isDragging ? targetAffixRef : null}
            >
              {affix.text}
            </span>);
};

export default LireoMorphAffix;