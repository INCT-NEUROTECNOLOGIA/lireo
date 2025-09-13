import { useState, useRef } from "react";
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

  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerRect = useRef<DOMRect | null>(null);
  const targetAffixRef = useRef<HTMLSpanElement | null>(null);
  const targetAffixRect = useRef<DOMRect | null>(null);
  const currentIndex = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const offset = useRef({ x: 0, y: 0 });

  const AVOID_ZONE_START = 40;
  const AVOID_ZONE_END = 60;
  const PADDING_PERCENT = 10;
  const THRESHOLD = 30;

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
    e.preventDefault();
    currentIndex.current = index;
    isDragging.current = true;

    targetAffixRect.current = (e.target as HTMLElement).getBoundingClientRect();

    offset.current.x =
      e.clientX -
      targetAffixRect.current.left -
      targetAffixRect.current.width / 2;
    offset.current.y =
      e.clientY -
      targetAffixRect.current.top -
      targetAffixRect.current.height / 2;

    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const moveAffix = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    const leftPercent = clamp(
      ((e.clientX - containerRect.current.left - offset.current.x) /
        containerRect.current.width) *
        100,
      PADDING_PERCENT,
      100 - PADDING_PERCENT
    );

    const topPercent = clamp(
      ((e.clientY - containerRect.current.top - offset.current.y) /
        containerRect.current.height) *
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
    fitWithRadical();
    isDragging.current = false;
    document.removeEventListener("mousemove", moveAffix);
    document.removeEventListener("mouseup", dropAffix);
  };

  const fitWithRadical = () => {
    if (
      currentIndex.current !== null &&
      containerRef.current &&
      radicalRef.current &&
      targetAffixRect.current
    ) {
      if (
        radicalRef.current &&
        targetAffixRef.current &&
        containerRect.current
      ) {
        const radicalRect = radicalRef.current.getBoundingClientRect();
        targetAffixRect.current =
          targetAffixRef.current.getBoundingClientRect();

        const distance = Math.abs(
          targetAffixRect.current.left - radicalRect.right
        );

        if (distance < THRESHOLD) {
          const leftPercent =
            ((radicalRect.right -
              containerRect.current.left +
              targetAffixRect.current.width / 2) /
              containerRect.current.width) *
            100;

          const topPercent =
            ((radicalRect.top -
              containerRect.current.top +
              targetAffixRect.current.height / 2) /
              containerRect.current.height) *
            100;

          setAffixes((prev) =>
            prev.map((a, i) =>
              i === currentIndex.current
                ? {
                    ...a,
                    position: {
                      x: leftPercent - 1.5,
                      y: topPercent,
                    },
                  }
                : a
            )
          );
        }
      }
    }
  };

  return {
    radical,
    affixes,
    currentIndex,
    summaryClose,
    isDragging,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectedRadical,
    grabAffix,
  };
};

export default useLireMorph;
