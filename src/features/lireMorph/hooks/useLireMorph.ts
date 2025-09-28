import { useState, useRef, useMemo, useEffect } from "react";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";
import { PrefixesEnum } from "../types/prefix.enum";
import { SuffixEnum } from "../types/suffix.enum";

type Position = {
  x: number;
  y: number;
};

type Affix = {
  text: PrefixesEnum | SuffixEnum;
  position: Position;
};

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [radicalIndex, setRadicalIndex] = useState<number | null>(null);
  const [affixes, setAffixes] = useState<Affix[]>([]);
  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerRect = useRef<DOMRect | null>(null);
  const targetAffixRef = useRef<HTMLSpanElement | null>(null);
  const targetAffixRect = useRef<DOMRect | null>(null);
  const dragState = useRef({
    currentIndex: null as number | null,
    isDragging: false,
    isFittedLeft: false,
    isFittedRight: false,
    offset: { x: 0, y: 0 },
  });

  const ROWS = 4;
  const COLS = 4;
  const FLUTTER = 5;
  const PADDING = 10;
  const THRESHOLD = 15;
  const DISTANCE_FIT = 15;

  const cellsGrid = useMemo(() => {
    const cells: Position[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellX =
          (100 / COLS) * (col + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        const cellY =
          (100 / ROWS) * (row + 0.5) + (Math.random() * 2 - 1) * FLUTTER;
        cells.push({ x: cellX, y: cellY });
      }
    }
    return cells;
  }, []);

  const shuffleCells = (cells: Position[]) => {
    const shuffled = [...cells];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeAffixes = (affixes: (PrefixesEnum | SuffixEnum)[]): Affix[] => {
    const shuffled = shuffleCells(cellsGrid);
    return affixes.map((text, i) => ({
      text,
      position: shuffled[i],
    }));
  };

  const radical = useMemo(() => {
    if (radicalIndex === null) return lireMorphText.exemple.radical;
    return radicals[radicalIndex].radical;
  }, [radicalIndex]);

  useEffect(() => {
    if (radicalIndex === null) {
      setAffixes(initializeAffixes(lireMorphText.exemple.suffixes));
    } else {
      setAffixes(initializeAffixes(radicals[radicalIndex].suffixes));
    }
  }, [radicalIndex]);

  const selectedRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    setRadicalIndex(index);
    setSummaryClose(true);
  };

  const grabAffix = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    dragState.current.currentIndex = index;
    dragState.current.isDragging = true;
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;

    targetAffixRef.current = e.currentTarget as HTMLSpanElement;
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();

    dragState.current.offset.x =
      e.clientX -
      targetAffixRect.current.left -
      targetAffixRect.current.width / 2;
    dragState.current.offset.y =
      e.clientY -
      targetAffixRect.current.top -
      targetAffixRect.current.height / 2;

    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const moveAffix = (e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    const leftPercent = clamp(
      ((e.clientX - containerRect.current.left - dragState.current.offset.x) /
        containerRect.current.width) *
        100,
      PADDING,
      100 - PADDING
    );

    const topPercent = clamp(
      ((e.clientY - containerRect.current.top - dragState.current.offset.y) /
        containerRect.current.height) *
        100,
      PADDING,
      100 - PADDING
    );

    setAffixes((prev) =>
      prev.map((a, i) =>
        i === dragState.current.currentIndex
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
    dragState.current.isDragging = false;
    document.removeEventListener("mousemove", moveAffix);
    document.removeEventListener("mouseup", dropAffix);
  };

  const fitWithRadical = () => {
    if (dragState.current.currentIndex === null) return;
    if (!containerRef.current || !radicalRef.current || !targetAffixRef.current)
      return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();
    const radicalRect = radicalRef.current.getBoundingClientRect();

    const distanceLeft = Math.abs(
      targetAffixRect.current.right - radicalRect.left
    );
    const distanceRight = Math.abs(
      targetAffixRect.current.left - radicalRect.right
    );

    const distanceTop = targetAffixRect.current.bottom - radicalRect.top;
    const distanceBottom = targetAffixRect.current.top - radicalRect.bottom;

    let fitPosition: Position = { x: 0, y: 0 };

    if (distanceBottom < THRESHOLD || distanceTop < THRESHOLD) {
      fitPosition.y =
        ((radicalRect.top +
          targetAffixRect.current.height / 2 -
          containerRect.current.top) /
          containerRect.current.height) *
        100;
    }

    if (distanceLeft < THRESHOLD) {
      dragState.current.isFittedLeft = true;
      fitPosition.x =
        ((radicalRect.left -
          targetAffixRect.current.width / 2 -
          containerRect.current.left +
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    } else if (distanceRight < THRESHOLD) {
      dragState.current.isFittedRight = true;
      fitPosition.x =
        ((radicalRect.right -
          containerRect.current.left +
          targetAffixRect.current.width / 2 -
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    }

    if (fitPosition.x != 0 && fitPosition.y != 0) {
      setAffixes((prev: Affix[]) =>
        prev.map((a, i) =>
          i === dragState.current.currentIndex
            ? {
                ...a,
                position: fitPosition,
              }
            : a
        )
      );
    }
  };

  return {
    radical,
    affixes,
    summaryClose,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectedRadical,
    grabAffix,
  };
};

export default useLireMorph;
