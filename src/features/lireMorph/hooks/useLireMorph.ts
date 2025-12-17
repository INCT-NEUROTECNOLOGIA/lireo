<<<<<<< HEAD
import { useRef, useState, useCallback, useEffect } from "react";
import useLireMorphData from "./useLireMorphData";
import { Position } from "../types/position.type";
=======
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';

import { lireMorphText } from '../texts/lireMorphText';
import { radicals } from '../texts/radicals';

import { PrefixesEnum } from '../types/prefix.enum';
import { SuffixEnum } from '../types/suffix.enum';
import { Affix } from '../types/Affix.type';
import { Position } from '../types/position.type';
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

const PADDING = 10;
const THRESHOLD = 15; // Valor original
const DISTANCE_FIT = 15; // Valor original essencial para o "grude"

const useLireMorph = () => {
<<<<<<< HEAD
  const data = useLireMorphData();
  const { setAffixes, selectedRadicalIndex } = data;

  const [fittedAffixes, setFittedAffixes] = useState<{ [key: number]: "left" | "right" | null }>({});
  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
=======
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [selectedRadicalIndex, setSelectedRadicalIndex] = useState<
    number | null
  >(null);

  const [affixes, setAffixes] = useState<Affix[]>([]);
  const [showPrefixes, setShowPrefixes] = useState<boolean>(true);
  const [showSuffixes, setShowSuffixes] = useState<boolean>(true);

  const isInitialLoad = useRef<boolean>(true);

  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerRect = useRef<DOMRect | null>(null);

>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453
  const targetAffixRef = useRef<HTMLSpanElement | null>(null);
  
  // Guardamos os Rects como no original para precisão
  const containerRect = useRef<DOMRect | null>(null);
  const targetAffixRect = useRef<DOMRect | null>(null);

<<<<<<< HEAD
=======
  const [fittedAffixes, setFittedAffixes] = useState<{
    [key: number]: 'left' | 'right' | null;
  }>({});

>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453
  const dragState = useRef({
    currentIndex: null as number | null,
    isDragging: false,
    isFittedLeft: false,
    isFittedRight: false,
    offset: { x: 0, y: 0 },
  });

<<<<<<< HEAD
  useEffect(() => {
    setFittedAffixes({});
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;
  }, [selectedRadicalIndex]);

  const moveAffix = useCallback((e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;
=======
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
          (100 / COLS) * (col + 0.5) +
          (Math.random() * 2 - 1) * FLUTTER;

        const cellY =
          (100 / ROWS) * (row + 0.5) +
          (Math.random() * 2 - 1) * FLUTTER;

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

  const _getVisibleAffixes = (
    prefixes: PrefixesEnum[],
    suffixes: SuffixEnum[],
  ): (PrefixesEnum | SuffixEnum)[] => {
    let targetAffixes: (PrefixesEnum | SuffixEnum)[] = [];

    if (showPrefixes) {
      targetAffixes = [...targetAffixes, ...prefixes];
    }

    if (showSuffixes) {
      targetAffixes = [...targetAffixes, ...suffixes];
    }

    return targetAffixes;
  };

  const _filterAffixesThatWillBeVisible = (
    affixes: Affix[],
    targetAffixes: (PrefixesEnum | SuffixEnum)[],
  ): Affix[] => {
    return affixes.filter((affix) =>
      targetAffixes.includes(affix.text),
    );
  };

  const _findAffixesThatNeedToBeAdded = (
    existingAffixes: Affix[],
    targetAffixes: (PrefixesEnum | SuffixEnum)[],
  ): (PrefixesEnum | SuffixEnum)[] => {
    return targetAffixes.filter(
      (text) =>
        !existingAffixes.some(
          (affix) => affix.text === text,
        ),
    );
  };

  const _cleaningFittedAffixes = useCallback(() => {
    setFittedAffixes((prev) => {
      const newFittedAffixes = { ...prev };

      Object.keys(newFittedAffixes).forEach((key) => {
        const index = parseInt(key);
        if (index >= affixes.length) {
          delete newFittedAffixes[index];
        }
      });

      return newFittedAffixes;
    });
  }, [affixes.length]);

  const updateAffixesBasedOnFilters = useCallback(
    (prefixes: PrefixesEnum[], suffixes: SuffixEnum[]): void => {
      setAffixes((prevAffixes) => {
        const targetAffixes = _getVisibleAffixes(
          prefixes,
          suffixes,
        );

        const existingAffixes =
          _filterAffixesThatWillBeVisible(
            prevAffixes,
            targetAffixes,
          );

        const newAffixTexts =
          _findAffixesThatNeedToBeAdded(
            existingAffixes,
            targetAffixes,
          );

        const usedPositions = existingAffixes.map(
          (affix) => affix.position,
        );

        const availablePositions = shuffleCells(
          cellsGrid,
        ).filter(
          (pos) =>
            !usedPositions.some(
              (used) =>
                Math.abs(used.x - pos.x) < 5 &&
                Math.abs(used.y - pos.y) < 5,
            ),
        );

        const newAffixes = newAffixTexts.map(
          (text, i) => ({
            text,
            position:
              availablePositions[i] ||
              shuffleCells(cellsGrid)[i],
          }),
        );

        return [...existingAffixes, ...newAffixes];
      });

      _cleaningFittedAffixes();
    },
    [showPrefixes, showSuffixes, cellsGrid, affixes.length],
  );

  const selectRadical = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const index = parseInt(event.target.value);
    setSelectedRadicalIndex(index);
    setSummaryClose(true);
    _resetAllDragState();
  };

  const togglePrefixes = () => {
    setShowPrefixes((prev) => !prev);
  };

  const toggleSuffixes = () => {
    setShowSuffixes((prev) => !prev);
  };

  const selectedRadical = useMemo(() => {
    if (selectedRadicalIndex === null) {
      return lireMorphText.example.radical;
    }

    return radicals[selectedRadicalIndex].radical;
  }, [selectedRadicalIndex]);

  const grabAffix = (
    e: React.MouseEvent,
    index: number,
  ) => {
    e.preventDefault();

    _resetDragStateToIsDragging(index);
    _setTheTargetAffixWithTheMouseInfo(e);

    const newPosition = _getTheNewAffixPosition(e);
    if (!newPosition) return;

    dragState.current.offset = newPosition;

    document.addEventListener('mousemove', moveAffix);
    document.addEventListener('mouseup', dropAffix);
  };

  const _resetDragStateToIsDragging = (index: number) => {
    dragState.current.currentIndex = index;
    dragState.current.isDragging = true;
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;
  };

  const _resetAllDragState = () => {
    dragState.current.currentIndex = null;
    dragState.current.isDragging = false;
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;
  };

  const _setTheTargetAffixWithTheMouseInfo = (
    e: React.MouseEvent,
  ) => {
    targetAffixRef.current = e.target as HTMLSpanElement;
    targetAffixRect.current =
      targetAffixRef.current.getBoundingClientRect();
  };

  const _getTheNewAffixPosition = (
    e: React.MouseEvent,
  ) => {
    if (!targetAffixRef.current || !targetAffixRect.current)
      return;

    const newPosition: Position = {
      x:
        e.clientX -
        targetAffixRect.current.left -
        targetAffixRect.current.width / 2,
      y:
        e.clientY -
        targetAffixRect.current.top -
        targetAffixRect.current.height / 2,
    };

    return newPosition;
  };

  const moveAffix = (e: MouseEvent) => {
    if (
      !dragState.current.isDragging ||
      !containerRef.current
    )
      return;
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

    containerRect.current =
      containerRef.current.getBoundingClientRect();

<<<<<<< HEAD
    // Lógica de clamp original
    const leftPercent = Math.min(Math.max(
      ((e.clientX - containerRect.current.left - dragState.current.offset.x) / containerRect.current.width) * 100,
      PADDING), 100 - PADDING
    );

    const topPercent = Math.min(Math.max(
      ((e.clientY - containerRect.current.top - dragState.current.offset.y) / containerRect.current.height) * 100,
      PADDING), 100 - PADDING
    );

    setAffixes((prev) => {
      const idx = dragState.current.currentIndex;
      if (idx === null || idx < 0 || idx >= prev.length) return prev;
      const newAffixes = [...prev];
      newAffixes[idx] = { ...newAffixes[idx], position: { x: leftPercent, y: topPercent } };
      return newAffixes;
    });
  }, [setAffixes]);

  const fitWithRadical = useCallback(() => {
    if (dragState.current.currentIndex === null || !containerRef.current || !radicalRef.current || !targetAffixRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();
    const radicalRect = radicalRef.current.getBoundingClientRect();

    // Cálculos de distância originais
    const distanceLeft = Math.abs(targetAffixRect.current.right - radicalRect.left);
    const distanceRight = Math.abs(targetAffixRect.current.left - radicalRect.right);
    const distanceTop = Math.abs(targetAffixRect.current.bottom - radicalRect.top);
    const distanceBottom = Math.abs(targetAffixRect.current.top - radicalRect.bottom);

    let fitPosition: Position = { x: 0, y: 0 };
    let fittedSide: "left" | "right" | null = null;

    // Verificação de Threshold vertical original
    if (distanceBottom < THRESHOLD || distanceTop < THRESHOLD || 
       (targetAffixRect.current.top < radicalRect.bottom && targetAffixRect.current.bottom > radicalRect.top)) {
      
      fitPosition.y = ((radicalRect.top + targetAffixRect.current.height / 2 - containerRect.current.top) / containerRect.current.height) * 100;
      
      const isLeftOccupied = Object.entries(fittedAffixes).some(([idx, side]) => 
        parseInt(idx) !== dragState.current.currentIndex && side === 'left'
      );
      const isRightOccupied = Object.entries(fittedAffixes).some(([idx, side]) => 
        parseInt(idx) !== dragState.current.currentIndex && side === 'right'
      );

      if (distanceLeft < THRESHOLD && !isLeftOccupied) {
        dragState.current.isFittedLeft = true;
        fittedSide = 'left';
        fitPosition.x = ((radicalRect.left - targetAffixRect.current.width / 2 - containerRect.current.left + DISTANCE_FIT) / containerRect.current.width) * 100;
      } else if (distanceRight < THRESHOLD && !isRightOccupied) {
        dragState.current.isFittedRight = true;
        fittedSide = 'right';
        fitPosition.x = ((radicalRect.right - containerRect.current.left + targetAffixRect.current.width / 2 - DISTANCE_FIT) / containerRect.current.width) * 100;
      }
    }

    // A condição mágica do original: só aplica se houver fit real
    if (fitPosition.x !== 0 && fitPosition.y !== 0 && fittedSide) {
      setFittedAffixes(prev => ({ ...prev, [dragState.current.currentIndex!]: fittedSide }));
      setAffixes(prev => prev.map((a, i) => i === dragState.current.currentIndex ? { ...a, position: fitPosition } : a));
    } else {
      dragState.current.isFittedLeft = false;
      dragState.current.isFittedRight = false;
      setFittedAffixes(prev => {
        const next = { ...prev };
        delete next[dragState.current.currentIndex!];
        return next;
      });
=======
    const newPosition = _newPosition(e, containerRect);

    setAffixes((prev) => {
      const indexToUpdate =
        dragState.current.currentIndex ?? -1;

      if (
        indexToUpdate < 0 ||
        indexToUpdate >= prev.length
      ) {
        return prev;
      }

      const newAffixes = [...prev];

      newAffixes[indexToUpdate] = {
        ...newAffixes[indexToUpdate],
        position: newPosition,
      };

      return newAffixes;
    });
  };

  const _newPosition = (
    e: MouseEvent,
    containerRect: React.RefObject<DOMRect | null>,
  ): Position => {
    const leftPercent = _clamp(
      ((e.clientX -
        containerRect.current!.left -
        dragState.current.offset.x) /
        containerRect.current!.width) *
        100,
      PADDING,
      100 - PADDING,
    );

    const topPercent = _clamp(
      ((e.clientY -
        containerRect.current!.top -
        dragState.current.offset.y) /
        containerRect.current!.height) *
        100,
      PADDING,
      100 - PADDING,
    );

    return { x: leftPercent, y: topPercent };
  };

  const _clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const dropAffix = () => {
    fitWithRadical();
    dragState.current.isDragging = false;

    document.removeEventListener('mousemove', moveAffix);
    document.removeEventListener('mouseup', dropAffix);
  };

  const _verifyIfTheLeftOrRightIsOccupied = () => {
    const currentIndex = dragState.current.currentIndex;

    if (currentIndex === null) {
      return { isLeftOccupied: false, isRightOccupied: false };
    }

    const isLeftOccupied = Object.entries(
      fittedAffixes,
    ).some(
      ([idx, side]) =>
        parseInt(idx) !== currentIndex &&
        side === 'left',
    );

    const isRightOccupied = Object.entries(
      fittedAffixes,
    ).some(
      ([idx, side]) =>
        parseInt(idx) !== currentIndex &&
        side === 'right',
    );

    return { isLeftOccupied, isRightOccupied };
  };

  const fitWithRadical = () => {
    if (dragState.current.currentIndex === null)
      return;

    if (
      !containerRef.current ||
      !radicalRef.current ||
      !targetAffixRef.current
    )
      return;

    containerRect.current =
      containerRef.current.getBoundingClientRect();

    targetAffixRect.current =
      targetAffixRef.current.getBoundingClientRect();

    const radicalRect =
      radicalRef.current.getBoundingClientRect();

    const distanceLeft = Math.abs(
      targetAffixRect.current.right - radicalRect.left,
    );

    const distanceRight = Math.abs(
      targetAffixRect.current.left - radicalRect.right,
    );

    const distanceTop =
      targetAffixRect.current.bottom - radicalRect.top;

    const distanceBottom =
      targetAffixRect.current.top - radicalRect.bottom;

    let fitPosition: Position = { x: 0, y: 0 };
    let fittedSide: 'left' | 'right' | null = null;

    if (
      distanceBottom < THRESHOLD ||
      distanceTop < THRESHOLD
    ) {
      fitPosition.y =
        ((radicalRect.top +
          targetAffixRect.current.height / 2 -
          containerRect.current.top) /
          containerRect.current.height) *
        100;
    }

    const { isLeftOccupied, isRightOccupied } =
      _verifyIfTheLeftOrRightIsOccupied();

    if (distanceLeft < THRESHOLD && !isLeftOccupied) {
      dragState.current.isFittedLeft = true;
      fittedSide = 'left';

      fitPosition.x =
        ((radicalRect.left -
          targetAffixRect.current.width / 2 -
          containerRect.current.left +
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    } else if (
      distanceRight < THRESHOLD &&
      !isRightOccupied
    ) {
      dragState.current.isFittedRight = true;
      fittedSide = 'right';

      fitPosition.x =
        ((radicalRect.right -
          containerRect.current.left +
          targetAffixRect.current.width / 2 -
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    }

    if (
      fitPosition.x !== 0 &&
      fitPosition.y !== 0 &&
      fittedSide
    ) {
      setFittedAffixes((prev) => ({
        ...prev,
        [dragState.current.currentIndex!]: fittedSide,
      }));

      setAffixes((prev: Affix[]) =>
        prev.map((a, i) =>
          i === dragState.current.currentIndex
            ? { ...a, position: fitPosition }
            : a,
        ),
      );
    } else {
      dragState.current.isFittedLeft = false;
      dragState.current.isFittedRight = false;

      if (fittedAffixes[dragState.current.currentIndex!]) {
        setFittedAffixes((prev) => {
          const newFittedAffixes = { ...prev };
          delete newFittedAffixes[
            dragState.current.currentIndex!
          ];
          return newFittedAffixes;
        });
      }
    }
  };

  const previousRadicalIndex = useRef<number | null>(
    null,
  );
  const previousShowPrefixes = useRef<boolean>(true);
  const previousShowSuffixes = useRef<boolean>(true);

  const _updateAffixesBasedOnFilters = useCallback(() => {
    if (selectedRadicalIndex === null) {
      updateAffixesBasedOnFilters(
        lireMorphText.example.prefixes,
        lireMorphText.example.suffixes,
      );
    } else {
      updateAffixesBasedOnFilters(
        radicals[selectedRadicalIndex].prefixes,
        radicals[selectedRadicalIndex].suffixes,
      );
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453
    }
  }, [fittedAffixes, setAffixes]);

<<<<<<< HEAD
  const dropAffix = useCallback(() => {
    fitWithRadical();
    dragState.current.isDragging = false;
    document.removeEventListener("mousemove", moveAffix);
    document.removeEventListener("mouseup", dropAffix);
  }, [moveAffix, fitWithRadical]);

  const grabAffix = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    dragState.current.currentIndex = index;
    dragState.current.isDragging = true;

    const target = e.currentTarget as HTMLSpanElement;
    const rect = target.getBoundingClientRect();
    
    // Offset original: centralizado no mouse
    dragState.current.offset = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };

    targetAffixRef.current = target;
    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };
=======
  useEffect(() => {
    const radicalChanged =
      previousRadicalIndex.current !==
      selectedRadicalIndex;

    const filtersChanged =
      previousShowPrefixes.current !== showPrefixes ||
      previousShowSuffixes.current !== showSuffixes;

    if (isInitialLoad.current || radicalChanged) {
      setFittedAffixes({});
      _updateAffixesBasedOnFilters();
      isInitialLoad.current = false;
    } else if (filtersChanged) {
      _updateAffixesBasedOnFilters();
    }

    previousRadicalIndex.current = selectedRadicalIndex;
    previousShowPrefixes.current = showPrefixes;
    previousShowSuffixes.current = showSuffixes;
  }, [
    selectedRadicalIndex,
    showPrefixes,
    showSuffixes,
    updateAffixesBasedOnFilters,
  ]);
>>>>>>> 383840a1845e18fbd8e3cb96bd9bf8a739347453

  return {
    ...data,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    fittedAffixes,
    grabAffix,
  };
};

export default useLireMorph;