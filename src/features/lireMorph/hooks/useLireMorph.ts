import { useState, useRef } from "react";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

type Affix = {
  text: string;
  positionTop: number;
  positionLeft: number;
};

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [radical, setRadical] = useState<string>(lireMorphText.exemple.radical);
  const currentIndex = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const offset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ZONE_START: number = 15;
  const ZONE_END: number = 85;
  const AVOID_ZONE_START: number = 40;
  const AVOID_ZONE_END: number = 60;

  const getRandomPosition = (): { top: number; left: number } => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { top: 0, left: 0 };

    let top, left;
    do {
      top = Math.random() * rect.height;
      left = Math.random() * rect.width;
    } while (
      top > rect.height * (AVOID_ZONE_START / 100) &&
      top < rect.height * (AVOID_ZONE_END / 100)
    );

    return { top, left };
  };

  const initializeAffixes = (affixes: string[]): Affix[] => {
    return affixes.map((text) => ({
      text,
      positionTop: getRandomPosition().top,
      positionLeft: getRandomPosition().left,
    }));
  };

  const [affixes, setAffixes] = useState<Affix[]>(
    initializeAffixes(lireMorphText.exemple.prefixes)
  );

  const selectedRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);

    setRadical(radicals[index].radical);
    setAffixes(initializeAffixes(radicals[index].prefixes));
    setSummaryClose(true);
  };

  const grabAffix = (e: React.MouseEvent, index: number) => {
    isDragging.current = true;
    currentIndex.current = index;

    const AffixPosition = (e.target as HTMLElement).getBoundingClientRect();

    offset.current.x = e.clientX - AffixPosition.left;
    offset.current.y = e.clientY - AffixPosition.top;

    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };

  const moveAffix = (e: MouseEvent) => {
    if (!isDragging.current) return;

    setAffixes((prev) =>
      prev.map((affix, index) =>
        index === currentIndex.current
          ? {
              ...affix,
              positionLeft: e.clientX + offset.current.x,
              positionTop: e.clientY + offset.current.y,
            }
          : affix
      )
    );
  };

  const dropAffix = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", moveAffix);
    document.removeEventListener("mouseup", dropAffix);
  };

  return {
    radical,
    affixes,
    summaryClose,
    selectedRadical,
    grabAffix,
  };
};

export default useLireMorph;
