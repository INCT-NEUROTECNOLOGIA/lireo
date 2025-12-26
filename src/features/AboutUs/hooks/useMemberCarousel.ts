import { useRef, useState, useCallback } from 'react';
import type { Member } from '../components/Section';
import { CAROUSEL_WAIT_TIME_MS } from '../constants/time';

export const useMemberCarousel = (members: Member[]) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const autoPlay = useCallback(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, CAROUSEL_WAIT_TIME_MS);

    return () => clearInterval(interval);
  }, [members.length, isPaused]);

  const updateTrackPosition = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return {
    trackRef,
    currentIndex,
    isPaused,
    setIsPaused,
    goToIndex,
    goPrev,
    goNext,
    autoPlay,
    updateTrackPosition,
  };
};
