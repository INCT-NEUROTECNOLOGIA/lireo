import React, { useEffect, useRef, useState } from "react";
import type { Member } from "../components/Section";


export function useMemberCarousel (members: Member[]) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const waitTime = 4000; 

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, waitTime);

    return () => clearInterval(interval);
  }, [members.length, isPaused]);

  useEffect(() => {
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
  };
}