import { useRef, useState } from "react";
import { Position } from "../types/position.type";
import { Morph } from "../types/morph.type";

interface useLireMorphMoveProps {
  setMorphs: React.Dispatch<React.SetStateAction<Morph[]>>;
}
const PADDING = 10;
const THRESHOLD = 15;
const DISTANCE_FIT = 15;

const useLireMorphMove = ({ setMorphs }: useLireMorphMoveProps) => {
  const [fittedMorph, setFittedMorph] = useState<{
    [key: number]: "left" | "right" | null;
  }>({});
  const containerRect = useRef<DOMRect | null>(null);
  const targetMorphRect = useRef<DOMRect | null>(null);
  const mainMorphRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetMorphRef = useRef<HTMLSpanElement | null>(null);
  const dragState = useRef({
    currentIndex: null as number | null,
    isDragging: false,
    isFittedLeft: false,
    isFittedRight: false,
    offset: { x: 0, y: 0 },
  });

  const grabMorph = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    _resetDragStateToIsDragging(index);

    _setTheTargetMorphWithTheMouseInfo(e);

    const newPosition = _getTheNewMorphPosition(e);
    if (!newPosition) return;

    dragState.current.offset = newPosition;

    document.addEventListener("mousemove", moveMorph);
    document.addEventListener("mouseup", dropMorph);
  };

  const _resetDragStateToIsDragging = (index: number) => {
    dragState.current.currentIndex = index;
    dragState.current.isDragging = true;
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;
  };

  const _setTheTargetMorphWithTheMouseInfo = (e: React.MouseEvent | React.TouchEvent) => {
    targetMorphRef.current = e.target as HTMLSpanElement;
    targetMorphRect.current = targetMorphRef.current.getBoundingClientRect();
  };

  const _getTheNewMorphPosition = (e: { clientX: number; clientY: number }) => {
    if (!targetMorphRef.current || !targetMorphRect.current) return;

    const newPosition: Position = {
      x:
        e.clientX -
        targetMorphRect.current.left -
        targetMorphRect.current.width / 2,
      y:
        e.clientY -
        targetMorphRect.current.top -
        targetMorphRect.current.height / 2,
    };

    return newPosition;
  };

  const moveMorph = (e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();

    const newPosition = _newPosition(e, containerRect);

    setMorphs((prev) => {
      const indexToUpdate = dragState.current.currentIndex ?? -1;

      if (indexToUpdate < 0 || indexToUpdate >= prev.length) {
        return prev;
      }

      const newmorph = [...prev];

      const updatedMorph = {
        ...newmorph[indexToUpdate],
        position: newPosition,
      };

      newmorph[indexToUpdate] = updatedMorph;

      return newmorph;
    });
  };

  const _newPosition = (
    e: { clientX: number; clientY: number },
    containerRect: React.RefObject<DOMRect | null>
  ): Position => {
    const leftPercent = _clamp(
      ((e.clientX - containerRect.current!.left - dragState.current.offset.x) /
        containerRect.current!.width) *
        100,
      PADDING,
      100 - PADDING
    );

    const topPercent = _clamp(
      ((e.clientY - containerRect.current!.top - dragState.current.offset.y) /
        containerRect.current!.height) *
        100,
      PADDING,
      100 - PADDING
    );

    return { x: leftPercent, y: topPercent };
  };

  const _clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const dropMorph = () => {
    fitWithRadical();
    dragState.current.isDragging = false;
    document.removeEventListener("mousemove", moveMorph);
    document.removeEventListener("mouseup", dropMorph);
  };
//
  const grabMorphTouch = (e: React.TouchEvent, index: number) => {
    e.preventDefault();

    _resetDragStateToIsDragging(index);

    const touch = e.touches[0];
    _setTheTargetMorphWithTheMouseInfo(e);

    const newPosition = _getTheNewMorphPosition(touch);
    if (!newPosition) return;

    dragState.current.offset = newPosition;

    document.addEventListener("touchmove", moveMorphTouch, { passive: false });
    document.addEventListener("touchend", dropMorphTouch);
  };

  const moveMorphTouch = (e: TouchEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;

    containerRect.current = containerRef.current.getBoundingClientRect();

    const newPosition = _newPosition(touch, containerRect);

    setMorphs((prev) => {
      const indexToUpdate = dragState.current.currentIndex ?? -1;

      if (indexToUpdate < 0 || indexToUpdate >= prev.length) {
        return prev;
      }

      const newmorph = [...prev];

      const updatedMorph = {
        ...newmorph[indexToUpdate],
        position: newPosition,
      };

      newmorph[indexToUpdate] = updatedMorph;

      return newmorph;
    });
  };

  const dropMorphTouch = () => {
    fitWithRadical();
    dragState.current.isDragging = false;

    document.removeEventListener("touchmove", moveMorphTouch);
    document.removeEventListener("touchend", dropMorphTouch);
  };
//

  const _verifyIfTheLeftOrRightIsOccupied = () => {
    const currentIndex = dragState.current.currentIndex;
    if (currentIndex === null)
      return { isLeftOccupied: false, isRightOccupied: false };
    const isLeftOccupied = Object.entries(fittedMorph).some(
      ([idx, side]) => parseInt(idx) !== currentIndex && side === "left"
    );
    const isRightOccupied = Object.entries(fittedMorph).some(
      ([idx, side]) => parseInt(idx) !== currentIndex && side === "right"
    );
    return {
      isLeftOccupied,
      isRightOccupied,
    };
  };

  const fitWithRadical = () => {
    if (dragState.current.currentIndex === null) return;
    if (
      !containerRef.current ||
      !mainMorphRef.current ||
      !targetMorphRef.current
    )
      return;

    containerRect.current = containerRef.current.getBoundingClientRect();
    targetMorphRect.current = targetMorphRef.current.getBoundingClientRect();

    const radicalRect = mainMorphRef.current.getBoundingClientRect();

    const distanceLeft = Math.abs(
      targetMorphRect.current.right - radicalRect.left
    );
    const distanceRight = Math.abs(
      targetMorphRect.current.left - radicalRect.right
    );
    const distanceTop = targetMorphRect.current.bottom - radicalRect.top;
    const distanceBottom = targetMorphRect.current.top - radicalRect.bottom;

    let fitPosition: Position = { x: 0, y: 0 };
    let fittedSide: "left" | "right" | null = null;

    if (distanceBottom < THRESHOLD || distanceTop < THRESHOLD) {
      fitPosition.y =
        ((radicalRect.top +
          targetMorphRect.current.height / 2 -
          containerRect.current.top) /
          containerRect.current.height) *
        100;
    }

    const { isLeftOccupied, isRightOccupied } =
      _verifyIfTheLeftOrRightIsOccupied();

    if (distanceLeft < THRESHOLD && !isLeftOccupied) {
      dragState.current.isFittedLeft = true;
      fittedSide = "left";
      fitPosition.x =
        ((radicalRect.left -
          targetMorphRect.current.width / 2 -
          containerRect.current.left +
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    } else if (distanceRight < THRESHOLD && !isRightOccupied) {
      dragState.current.isFittedRight = true;
      fittedSide = "right";
      fitPosition.x =
        ((radicalRect.right -
          containerRect.current.left +
          targetMorphRect.current.width / 2 -
          DISTANCE_FIT) /
          containerRect.current.width) *
        100;
    }

    if (fitPosition.x != 0 && fitPosition.y != 0 && fittedSide) {
      setFittedMorph((prev) => ({
        ...prev,
        [dragState.current.currentIndex!]: fittedSide,
      }));

      setMorphs((prev: Morph[]) =>
        prev.map((a, i) =>
          i === dragState.current.currentIndex
            ? {
                ...a,
                position: fitPosition,
              }
            : a
        )
      );
    } else {
      dragState.current.isFittedLeft = false;
      dragState.current.isFittedRight = false;

      if (fittedMorph[dragState.current.currentIndex!]) {
        setFittedMorph((prev) => {
          const newFittedMorph = { ...prev };
          delete newFittedMorph[dragState.current.currentIndex!];
          return newFittedMorph;
        });
      }
    }
  };

  return {
    dragState,
    mainMorphRef,
    containerRef,
    targetMorphRef,
    fittedMorph,
    grabMorph,
    grabMorphTouch,
    moveMorphTouch,
    dropMorphTouch,
    setFittedMorph,
  };
};

export default useLireMorphMove;
