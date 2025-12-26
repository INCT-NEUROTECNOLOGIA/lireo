import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { lireMorphText } from '../texts/lireMorphText';
import { radicals } from '../texts/radicals';
import { PrefixesEnum } from '../types/prefix.enum';
import { SuffixEnum } from '../types/suffix.enum';
import { Affix } from '../types/Affix.type';
import { Position } from '../types/position.type';
import useLireMorphData from './useLireMorphData';

const useLireMorph = () => {
  const data = useLireMorphData();

  const isInitialLoad = useRef<boolean>(true);
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

  const THRESHOLD = 15;
  const DISTANCE_FIT = 15;
  const PADDING = 10;

  const _cleaningFittedAffixes = useCallback(() => {
    data.setFittedAffixes((prev) => {
      const newFittedAffixes = { ...prev };
      Object.keys(newFittedAffixes).forEach((key) => {
        const index = parseInt(key);

        if (index >= data.affixes.length) {
          delete newFittedAffixes[index];
        }
      });

      return newFittedAffixes;
    });
  }, [data.affixes.length, data.setFittedAffixes]);

  const updateAffixesBasedOnFilters = useCallback(
    (prefixes: PrefixesEnum[], suffixes: SuffixEnum[]): void => {
      data.setAffixes((prevAffixes) => {
        const targetAffixes = data._getVisibleAffixes(prefixes, suffixes);
        const existingAffixes = data._filterAffixesThatWillBeVisible(
          prevAffixes,
          targetAffixes,
        );
        const newAffixTexts = data._findAffixesThatNeedToBeAdded(
          existingAffixes,
          targetAffixes,
        );

        const usedPositions = existingAffixes.map((affix) => affix.position);
        const availablePositions = data
          .shuffleCells(data.cellsGrid)
          .filter(
            (pos) =>
              !usedPositions.some(
                (used) =>
                  Math.abs(used.x - pos.x) < 5 && Math.abs(used.y - pos.y) < 5,
              ),
          );

        const newAffixes = newAffixTexts.map((text, i) => ({
          text,
          position:
            availablePositions[i] || data.shuffleCells(data.cellsGrid)[i],
        }));

        return [...existingAffixes, ...newAffixes];
      });

      _cleaningFittedAffixes();
    },
    [
      data.showPrefixes,
      data.showSuffixes,
      data.cellsGrid,
      data.affixes.length,
      _cleaningFittedAffixes,
    ],
  );

  const selectRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    data.setSelectedRadicalIndex(index);
    data.setFittedAffixes({});
    data.setSummaryClose(true);
  };

  const togglePrefixes = () => data.setShowPrefixes((prev) => !prev);
  const toggleSuffixes = () => data.setShowSuffixes((prev) => !prev);

  const selectedRadical = useMemo(() => {
    if (data.selectedRadicalIndex === null)
      return lireMorphText.example.radical;
    return radicals[data.selectedRadicalIndex].radical;
  }, [data.selectedRadicalIndex]);

  const grabAffix = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    dragState.current.currentIndex = index;
    dragState.current.isDragging = true;
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;

    targetAffixRef.current = e.target as HTMLSpanElement;
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();

    dragState.current.offset = {
      x:
        e.clientX -
        targetAffixRect.current.left -
        targetAffixRect.current.width / 2,
      y:
        e.clientY -
        targetAffixRect.current.top -
        targetAffixRect.current.height / 2,
    };

    document.addEventListener('mousemove', moveAffix);
    document.addEventListener('mouseup', dropAffix);
  };

  const moveAffix = (e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;
    containerRect.current = containerRef.current.getBoundingClientRect();

    const leftPercent = Math.min(
      Math.max(
        ((e.clientX - containerRect.current.left - dragState.current.offset.x) /
          containerRect.current.width) *
          100,
        PADDING,
      ),
      100 - PADDING,
    );
    const topPercent = Math.min(
      Math.max(
        ((e.clientY - containerRect.current.top - dragState.current.offset.y) /
          containerRect.current.height) *
          100,
        PADDING,
      ),
      100 - PADDING,
    );

    data.setAffixes((prev) => {
      const indexToUpdate = dragState.current.currentIndex ?? -1;
      if (indexToUpdate < 0 || indexToUpdate >= prev.length) return prev;
      const newAffixes = [...prev];
      newAffixes[indexToUpdate] = {
        ...newAffixes[indexToUpdate],
        position: { x: leftPercent, y: topPercent },
      };
      return newAffixes;
    });
  };

  const dropAffix = () => {
    fitWithRadical();
    dragState.current.isDragging = false;
    document.removeEventListener('mousemove', moveAffix);
    document.removeEventListener('mouseup', dropAffix);
  };

  const fitWithRadical = () => {
    if (
      dragState.current.currentIndex === null ||
      !containerRef.current ||
      !radicalRef.current ||
      !targetAffixRef.current
    )
      return;
    containerRect.current = containerRef.current.getBoundingClientRect();
    targetAffixRect.current = targetAffixRef.current.getBoundingClientRect();
    const radicalRect = radicalRef.current.getBoundingClientRect();

    const distanceLeft = Math.abs(
      targetAffixRect.current.right - radicalRect.left,
    );
    const distanceRight = Math.abs(
      targetAffixRect.current.left - radicalRect.right,
    );
    const distanceTop = targetAffixRect.current.bottom - radicalRect.top;
    const distanceBottom = targetAffixRect.current.top - radicalRect.bottom;

    let fitPosition: Position = { x: 0, y: 0 };
    let fittedSide: 'left' | 'right' | null = null;

    if (distanceBottom < THRESHOLD || distanceTop < THRESHOLD) {
      fitPosition.y =
        ((radicalRect.top +
          targetAffixRect.current.height / 2 -
          containerRect.current.top) /
          containerRect.current.height) *
        100;
    }

    const isLeftOccupied = Object.entries(data.fittedAffixes).some(
      ([idx, side]) =>
        parseInt(idx) !== dragState.current.currentIndex && side === 'left',
    );
    const isRightOccupied = Object.entries(data.fittedAffixes).some(
      ([idx, side]) =>
        parseInt(idx) !== dragState.current.currentIndex && side === 'right',
    );

    if (distanceLeft < THRESHOLD && !isLeftOccupied) {
      fittedSide = 'left';
      fitPosition.x =
        ((radicalRect.left -
          targetAffixRect.current.width / 2 -
          containerRect.current.left +
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    } else if (distanceRight < THRESHOLD && !isRightOccupied) {
      fittedSide = 'right';
      fitPosition.x =
        ((radicalRect.right -
          containerRect.current.left +
          targetAffixRect.current.width / 2 -
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    }

    if (fitPosition.x !== 0 && fitPosition.y !== 0 && fittedSide) {
      data.setFittedAffixes((prev) => ({
        ...prev,
        [dragState.current.currentIndex!]: fittedSide,
      }));
      data.setAffixes((prev: Affix[]) =>
        prev.map((a, i) =>
          i === dragState.current.currentIndex
            ? { ...a, position: fitPosition }
            : a,
        ),
      );
    } else {
      if (data.fittedAffixes[dragState.current.currentIndex!]) {
        data.setFittedAffixes((prev) => {
          const newFittedAffixes = { ...prev };
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
        updateAffixesBasedOnFilters(
          lireMorphText.example.prefixes,
          lireMorphText.example.suffixes,
        );
      } else {
        updateAffixesBasedOnFilters(
          radicals[data.selectedRadicalIndex].prefixes,
          radicals[data.selectedRadicalIndex].suffixes,
        );
      }
    };

    const radicalChanged =
      previousRadicalIndex.current !== data.selectedRadicalIndex;
    const filtersChanged =
      previousShowPrefixes.current !== data.showPrefixes ||
      previousShowSuffixes.current !== data.showSuffixes;

    if (isInitialLoad.current || radicalChanged) {
      data.setFittedAffixes({});
      _update();
      isInitialLoad.current = false;
    } else if (filtersChanged) {
      _update();
    }

    previousRadicalIndex.current = data.selectedRadicalIndex;
    previousShowPrefixes.current = data.showPrefixes;
    previousShowSuffixes.current = data.showSuffixes;
  }, [
    data.selectedRadicalIndex,
    data.showPrefixes,
    data.showSuffixes,
    updateAffixesBasedOnFilters,
    data.setFittedAffixes,
  ]);

  return {
    selectedRadical,
    affixes: data.affixes,
    summaryClose: data.summaryClose,
    showPrefixes: data.showPrefixes,
    showSuffixes: data.showSuffixes,
    fittedAffixes: data.fittedAffixes,
    dragState,
    radicalRef,
    containerRef,
    targetAffixRef,
    selectRadical,
    grabAffix,
    togglePrefixes,
    toggleSuffixes,
  };
};

export default useLireMorph;
