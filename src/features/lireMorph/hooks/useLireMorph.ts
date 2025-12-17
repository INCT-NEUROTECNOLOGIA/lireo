import React, { useRef, useEffect, useCallback, useState } from "react";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";
import { Affix } from "../types/Affix.type";
import { Position } from "../types/position.type";
import useLireMorphData from "./useLireMorphData";

const useLireMorph = () => {
  const data = useLireMorphData();
  
  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerRect = useRef<DOMRect | null>(null);
  const targetAffixRef = useRef<HTMLSpanElement | null>(null);
  const targetAffixRect = useRef<DOMRect | null>(null);
  
  const [fittedAffixes, setFittedAffixes] = useState<{[key: number]: 'left' | 'right' | null}>({});
  
  const dragState = useRef({
    currentIndex: null as number | null,
    isDragging: false,
    isFittedLeft: false,
    isFittedRight: false,
    offset: { x: 0, y: 0 },
  });

  const PADDING = 10;
  const THRESHOLD = 15;
  const DISTANCE_FIT = 15;

  const _cleaningFittedAffixes = useCallback(() => {
    setFittedAffixes(prev => {
      const newFittedAffixes = {...prev};
      Object.keys(newFittedAffixes).forEach(key => {
        const index = parseInt(key);
        if (index >= data.affixes.length) {
          delete newFittedAffixes[index];
        }
      });
      return newFittedAffixes;
    });
  }, [data.affixes.length]);

  const grabAffix = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    _resetDragStateToIsDragging(index);
    _setTheTargetAffixWithTheMouseInfo(e);
    const newPosition = _getTheNewAffixPosition(e);
    if(!newPosition) return;
    dragState.current.offset = newPosition;
    document.addEventListener("mousemove", moveAffix);
    document.addEventListener("mouseup", dropAffix);
  };

  const _resetDragStateToIsDragging = (index: number) =>{
      dragState.current.currentIndex = index;
      dragState.current.isDragging = true;
      dragState.current.isFittedLeft = false;
      dragState.current.isFittedRight = false;
  }

  const _setTheTargetAffixWithTheMouseInfo = (e: React.MouseEvent) => {
      targetAffixRef.current = e.target as HTMLSpanElement;
      targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();
  }

  const _getTheNewAffixPosition = (e: React.MouseEvent) => {
    if (!targetAffixRef.current || !targetAffixRect.current) return;
    return {
      x: e.clientX - targetAffixRect.current.left - targetAffixRect.current.width / 2,
      y: e.clientY - targetAffixRect.current.top - targetAffixRect.current.height / 2,
    };
  }

  const moveAffix = (e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;
    containerRect.current = containerRef.current.getBoundingClientRect();
    const newPos = _newPosition(e, containerRect);

    data.setAffixes((prev) => {
      const indexToUpdate = dragState.current.currentIndex ?? -1;
      if (indexToUpdate < 0 || indexToUpdate >= prev.length) return prev;
      const newAffixes = [...prev];
      newAffixes[indexToUpdate] = { ...newAffixes[indexToUpdate], position: newPos };
      return newAffixes;
    });
  };

  const _newPosition =(e: MouseEvent, containerRect: React.RefObject<DOMRect | null>): Position => {
    const leftPercent = _clamp(((e.clientX - containerRect.current!.left - dragState.current.offset.x) / containerRect.current!.width) * 100, PADDING, 100 - PADDING);
    const topPercent = _clamp(((e.clientY - containerRect.current!.top - dragState.current.offset.y) / containerRect.current!.height) * 100, PADDING, 100 - PADDING);
    return {x: leftPercent, y: topPercent};
  };

  const _clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const dropAffix = () => {
    fitWithRadical();
    dragState.current.isDragging = false;
    document.removeEventListener("mousemove", moveAffix);
    document.removeEventListener("mouseup", dropAffix);
  };

  const _verifyIfTheLeftOrRightIsOccupied = () => {
    const currentIndex = dragState.current.currentIndex;
    if (currentIndex === null) return { isLeftOccupied: false, isRightOccupied: false };
    const isLeftOccupied = Object.entries(fittedAffixes).some(([idx, side]) => parseInt(idx) !== currentIndex && side === 'left');
    const isRightOccupied = Object.entries(fittedAffixes).some(([idx, side]) => parseInt(idx) !== currentIndex && side === 'right');
    return { isLeftOccupied, isRightOccupied };
  }

  const fitWithRadical = () => {
    if (dragState.current.currentIndex === null || !containerRef.current || !radicalRef.current || !targetAffixRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();
    const radicalRect = radicalRef.current.getBoundingClientRect();

    const distanceLeft = Math.abs(targetAffixRect.current.right - radicalRect.left);
    const distanceRight = Math.abs(targetAffixRect.current.left - radicalRect.right);
    const distanceTop = targetAffixRect.current.bottom - radicalRect.top;
    const distanceBottom = targetAffixRect.current.top - radicalRect.bottom;

    let fitPosition: Position = { x: 0, y: 0 };
    let fittedSide: 'left' | 'right' | null = null;

    if (distanceBottom < THRESHOLD || distanceTop < THRESHOLD) {
      fitPosition.y = ((radicalRect.top + targetAffixRect.current.height / 2 - containerRect.current.top) / containerRect.current.height) * 100;
    }

    const { isLeftOccupied, isRightOccupied } = _verifyIfTheLeftOrRightIsOccupied();

    if (distanceLeft < THRESHOLD && !isLeftOccupied) {
      dragState.current.isFittedLeft = true;
      fittedSide = 'left';
      fitPosition.x = ((radicalRect.left - targetAffixRect.current.width / 2 - containerRect.current.left + DISTANCE_FIT) / containerRect.current.width) * 100;
    } else if (distanceRight < THRESHOLD && !isRightOccupied) {
      dragState.current.isFittedRight = true;
      fittedSide = 'right';
      fitPosition.x = ((radicalRect.right - containerRect.current.left + targetAffixRect.current.width / 2 - DISTANCE_FIT) / containerRect.current.width) * 100;
    }

    if (fitPosition.x !== 0 && fitPosition.y !== 0 && fittedSide) {
      setFittedAffixes(prev => ({ ...prev, [dragState.current.currentIndex!]: fittedSide }));
      data.setAffixes((prev: Affix[]) => prev.map((a, i) => i === dragState.current.currentIndex ? { ...a, position: fitPosition } : a));
    } else {
      dragState.current.isFittedLeft = false;
      dragState.current.isFittedRight = false;
      if (fittedAffixes[dragState.current.currentIndex!]) {
        setFittedAffixes(prev => {
          const newFittedAffixes = {...prev};
          delete newFittedAffixes[dragState.current.currentIndex!];
          return newFittedAffixes;
        });
      }
    }
  };

  const previousRadicalIndex = useRef<number | null>(null);
  const previousShowPrefixes = useRef<boolean>(true);
  const previousShowSuffixes = useRef<boolean>(true);

  useEffect(() => {
    const _update = () => {
      if (data.selectedRadicalIndex === null) {
        data.updateAffixesBasedOnFilters(lireMorphText.example.prefixes, lireMorphText.example.suffixes);
      } else {
        data.updateAffixesBasedOnFilters(radicals[data.selectedRadicalIndex].prefixes, radicals[data.selectedRadicalIndex].suffixes);
      }
      _cleaningFittedAffixes();
    };

    const radicalChanged = previousRadicalIndex.current !== data.selectedRadicalIndex;
    const filtersChanged = previousShowPrefixes.current !== data.showPrefixes || previousShowSuffixes.current !== data.showSuffixes;

    if (data.isInitialLoad.current || radicalChanged) {
      setFittedAffixes({});
      _update();
      data.isInitialLoad.current = false;
    } else if (filtersChanged) {
      _update();
    }

    previousRadicalIndex.current = data.selectedRadicalIndex;
    previousShowPrefixes.current = data.showPrefixes;
    previousShowSuffixes.current = data.showSuffixes;
  }, [data.selectedRadicalIndex, data.showPrefixes, data.showSuffixes, data.updateAffixesBasedOnFilters, _cleaningFittedAffixes]);

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