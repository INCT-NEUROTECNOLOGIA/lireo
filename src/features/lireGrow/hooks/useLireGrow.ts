import React, { useState, useEffect, useRef } from "react";
import { LireGrowText } from "../texts/lireGrowText";

const useLireGrow = () => {
  const example: string[] = LireGrowText.example.split(" ");
  const [phrase, setPhrase] = useState<string[]>(example);
  const [currentIndex, setCurrentIndex] = useState(example.length);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [chosenImg, setChosenImg] = useState<string | null>(null);
  const currentPartRef = useRef<HTMLSpanElement | null>(null);
  const imgsRef: string[] = ["errada1", "errada2", "certa"];

  useEffect(() => {
    if (currentPartRef.current) {
      currentPartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const imgsPaths = (phrase: string[]) => {
    const imgFolder = `/lireGrowImgs/${phrase
      .join("_")
      .toLowerCase()
      .slice(0, -1)}`;

    return imgsRef
      .map((img) => `${imgFolder}/${img}.png`)
      .sort(() => Math.random() - 0.5);
  };

  const [shuffledImgsPaths, setShuffledImgsPaths] = useState<string[]>(
    imgsPaths(example)
  );

  const selectedPhrase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenPhrase = event.target.value.split(" ");
    setPhrase(chosenPhrase);
    setCurrentIndex(1);
    setShuffledImgsPaths(imgsPaths(chosenPhrase));
  };

  const nextPart = () => {
    if (currentIndex < phrase.length) setCurrentIndex(currentIndex + 1);
  };

  const selectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenImg(event.target.id);
  };

  const checkAnswer = () => {
    setCorrectAnswer(chosenImg !== null && chosenImg.includes("certa"));
  };

  return {
    phrase,
    currentIndex,
    correctAnswer,
    shuffledImgsPaths,
    currentPartRef,
    chosenImg,
    selectedPhrase,
    nextPart,
    selectedImg,
    checkAnswer,
  };
};

export default useLireGrow;
