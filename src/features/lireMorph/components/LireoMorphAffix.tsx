import { Affix } from "../types/Affix.type";
import { PrefixesEnum } from "../types/prefix.enum";


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
  fittedAffixes: {[key: number]: 'left' | 'right' | null};
  grabAffix: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => void;
  targetAffixRef: React.RefObject<HTMLSpanElement | null>;
}

const LireoMorphAffix = ({ index, affix, dragState, fittedAffixes, grabAffix, targetAffixRef }: LireoMorphAffixProps) => {
    const leftPosition = `${affix.position.x}%`;
    const topPosition = `${affix.position.y}%`;

    const isDragging = index === dragState.current.currentIndex &&
                dragState.current.isDragging;
    const isFittedLeft = (index === dragState.current.currentIndex && dragState.current.isFittedLeft) || 
                        fittedAffixes[index] === 'left';
    const isFittedRight = (index === dragState.current.currentIndex && dragState.current.isFittedRight) || 
                         fittedAffixes[index] === 'right';

    const isPrefix = Object.values(PrefixesEnum).includes(affix.text as PrefixesEnum);
    
    const getAffixType = () => {
        return isPrefix ? " prefix" : " suffix";
    };

    const classType = () =>{
        if(isDragging) return " dragging";
        if(isFittedLeft) return " fitLeft";
        if(isFittedRight) return " fitRight";
        return "";
    };

    return (<span
              key={index}
              className={
                "affix" + getAffixType() + classType()
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