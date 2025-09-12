import { useState, useRef, useEffect } from "react";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

type Position = {
  x: number;
  y: number;
};

type Affix = {
  text: string;
  position: Position;
};

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [radical, setRadical] = useState<string>(lireMorphText.exemple.radical);
  const [affixes, setAffixes] = useState<Affix[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const offset = useRef({ x: 0, y: 0 });

  const AVOID_ZONE_START = 40;
  const AVOID_ZONE_END = 60;
  const PADDING_PERCENT = 10;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const getRandomPosition = (): Position => {
    let position: Position = { x: 0, y: 0 };

    do {
      position.x =
        PADDING_PERCENT + Math.random() * (100 - 2 * PADDING_PERCENT);
    } while (position.x > AVOID_ZONE_START && position.x < AVOID_ZONE_END);

    do {
      position.y =
        PADDING_PERCENT + Math.random() * (100 - 2 * PADDING_PERCENT);
    } while (position.y > AVOID_ZONE_START && position.y < AVOID_ZONE_END);

    return position;
  };

  const initializeAffixes = (affixes: string[]): Affix[] => {
    return affixes.map((text) => ({
      text,
      position: getRandomPosition(),
    }));
  };

  useEffect(() => {
    if (containerRef.current) {
      setAffixes(initializeAffixes(lireMorphText.exemple.prefixes));
    }
    currentIndex.current = null;
  }, []);

  const selectedRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);

    setRadical(radicals[index].radical);
    if (containerRef.current) {
      setAffixes(initializeAffixes(radicals[index].prefixes));
    }
    setSummaryClose(true);
  };

  const grabAffix = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    currentIndex.current = index;
    isDragging.current = true;

    const targetRect = (e.target as HTMLElement).getBoundingClientRect();

    offset.current.x = e.clientX - targetRect.left - targetRect.width / 2;
    offset.current.y = e.clientY - targetRect.top - targetRect.height / 2;

    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };

  const moveAffix = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const leftPercent = clamp(
      ((e.clientX - containerRect.left - offset.current.x) /
        containerRect.width) *
        100,
      PADDING_PERCENT,
      100 - PADDING_PERCENT
    );

    const topPercent = clamp(
      ((e.clientY - containerRect.top - offset.current.y) /
        containerRect.height) *
        100,
      PADDING_PERCENT,
      100 - PADDING_PERCENT
    );

    setAffixes((prev) =>
      prev.map((a, i) =>
        i === currentIndex.current
          ? {
              ...a,
              position: {
                x: leftPercent,
                y: topPercent,
              },
            }
          : a
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
    currentIndex,
    summaryClose,
    containerRef,
    selectedRadical,
    grabAffix,
  };
};

export default useLireMorph;
