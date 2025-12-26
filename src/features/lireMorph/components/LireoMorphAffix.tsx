import useLireoMorphAffix from '../hooks/useLireoMorphAffix';
import { Morph } from '../types/morph.type';

interface LireoMorphAffixProps {
  index: number;
  morph: Morph;
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
  fittedMorph: { [key: number]: 'left' | 'right' | null };
  grabMorph: (
    e: React.PointerEvent<HTMLSpanElement, PointerEvent>,
    index: number,
  ) => void;
  targetMorphRef: React.RefObject<HTMLSpanElement | null>;
}

const LireoMorphAffix = ({
  index,
  morph,
  dragState,
  fittedMorph,
  grabMorph,
  targetMorphRef,
}: LireoMorphAffixProps) => {
  const { leftPosition, topPosition, isDragging, getMorphType, classType } =
    useLireoMorphAffix({
      index,
      morph,
      dragState,
      fittedMorph,
    });
  return (
    <span
      key={index}
      className={'morph' + getMorphType() + classType()}
      style={{
        left: leftPosition,
        top: topPosition,
      }}
      onMouseDown={(e) => grabMorph(e, index)}
      ref={isDragging ? targetMorphRef : null}
    >
      {morph.text}
    </span>
  );
};

export default LireoMorphAffix;
