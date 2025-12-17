import { useRef, useState, useCallback, useEffect } from "react";
import useLireMorphData from "./useLireMorphData";
import { Position } from "../types/position.type";

const PADDING = 10;
const THRESHOLD = 15; // Valor original
const DISTANCE_FIT = 15; // Valor original essencial para o "grude"

const useLireMorph = () => {
  const data = useLireMorphData();
  const { setAffixes, selectedRadicalIndex } = data;

  const [fittedAffixes, setFittedAffixes] = useState<{ [key: number]: "left" | "right" | null }>({});
  const radicalRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetAffixRef = useRef<HTMLSpanElement | null>(null);
  
  // Guardamos os Rects como no original para precisão
  const containerRect = useRef<DOMRect | null>(null);
  const targetAffixRect = useRef<DOMRect | null>(null);

  const dragState = useRef({
    currentIndex: null as number | null,
    isDragging: false,
    isFittedLeft: false,
    isFittedRight: false,
    offset: { x: 0, y: 0 },
  });

  useEffect(() => {
    setFittedAffixes({});
    dragState.current.isFittedLeft = false;
    dragState.current.isFittedRight = false;
  }, [selectedRadicalIndex]);

  const moveAffix = useCallback((e: MouseEvent) => {
    if (!dragState.current.isDragging || !containerRef.current) return;

    containerRect.current = containerRef.current.getBoundingClientRect();

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
    }
  }, [fittedAffixes, setAffixes]);

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