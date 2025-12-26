import { Morph } from '../types/morph.type';
import LireoMorphAffix from './LireoMorphAffix';

interface LireoMorphWordGameProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  mainMorphRef: React.RefObject<HTMLSpanElement | null>;
  targetMorphRef: React.RefObject<HTMLSpanElement | null>;
  selectedMainMorph: string;
  morphs: Morph[];
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
}

const LireoMorphWordGame = ({
  containerRef,
  mainMorphRef,
  targetMorphRef,
  selectedMainMorph,
  morphs,
  dragState,
  fittedMorph,
  grabMorph,
}: LireoMorphWordGameProps) => {
  return (
    <div className="wordsContainer" ref={containerRef}>
      <span className="mainMorph" ref={mainMorphRef}>
        {selectedMainMorph}
      </span>

      {morphs.map((morph, index) => (
        <LireoMorphAffix
          key={index}
          index={index}
          morph={morph}
          dragState={dragState}
          fittedMorph={fittedMorph}
          grabMorph={grabMorph}
          targetMorphRef={targetMorphRef}
        />
      ))}
    </div>
  );
};

export default LireoMorphWordGame;
