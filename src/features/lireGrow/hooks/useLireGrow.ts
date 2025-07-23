import React, { useState, useEffect, useRef } from "react";
import { LireGrowText } from "../texts/lireGrowText";

const useLireGrow = () => {
  const exemple = LireGrowText.exemple.split(" ");
  const [phrase, setPhrase] = useState<string[]>(exemple);
  const [currentIndex, setCurrentIndex] = useState(exemple.length);
  const currentPartRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (currentPartRef.current) {
      currentPartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const selectedPhrase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPhrase(event.target.value.split(" "));
    setCurrentIndex(1);
  };

  const nextPart = () => {
    if (currentIndex < phrase.length) setCurrentIndex(currentIndex + 1);
  };

  return {
    currentPartRef,
    phrase,
    currentIndex,
    selectedPhrase,
    nextPart,
  };
};

export default useLireGrow;
