import { useState, useEffect } from "react";
import { CAROUSEL_WAIT_TIME_MS } from "../constantes/time";

interface UseMemberCarouselProps {
  membersLength: number;
  isPaused: boolean;
  waitTime?: number;
}

export function useMemberCarousel({
  membersLength,
  isPaused,
  waitTime = CAROUSEL_WAIT_TIME_MS,
}: UseMemberCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index: number) => {
    setCurrentIndex(index % membersLength);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % membersLength);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + membersLength) % membersLength);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goNext, waitTime);
    return () => clearInterval(interval);
  }, [membersLength, isPaused, waitTime]);

  return { currentIndex, goToIndex, goNext, goPrev };
}
