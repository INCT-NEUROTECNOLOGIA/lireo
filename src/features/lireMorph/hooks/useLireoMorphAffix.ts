import { Morph } from '../types/morph.type';
import { PrefixesEnum } from '../types/prefix.enum';
import { SuffixEnum } from '../types/suffix.enum';

export interface useLireoMorphAffixProps {
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
}

const useLireoMorphAffix = ({
  index,
  morph,
  dragState,
  fittedMorph,
}: useLireoMorphAffixProps) => {
  const leftPosition = `${morph.position.x}%`;
  const topPosition = `${morph.position.y}%`;

  const isDragging =
    index === dragState.current.currentIndex && dragState.current.isDragging;
  const isFittedLeft =
    (index === dragState.current.currentIndex &&
      dragState.current.isFittedLeft) ||
    fittedMorph[index] === 'left';
  const isFittedRight =
    (index === dragState.current.currentIndex &&
      dragState.current.isFittedRight) ||
    fittedMorph[index] === 'right';

  const isPrefix = Object.values(PrefixesEnum).includes(
    morph.text as PrefixesEnum,
  );
  const isSuffix = Object.values(SuffixEnum).includes(morph.text as SuffixEnum);

  const getMorphType = () => {
    if (isPrefix) return ' prefix';
    if (isSuffix) return ' suffix';
    return ' radical';
  };

  const classType = () => {
    if (isDragging) return ' dragging';
    if (isFittedLeft) return ' fitLeft';
    if (isFittedRight) return ' fitRight';
    return '';
  };

  return { leftPosition, topPosition, isDragging, getMorphType, classType };
};

export default useLireoMorphAffix;
