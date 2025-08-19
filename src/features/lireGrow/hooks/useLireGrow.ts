import React, { useState, useEffect, useRef } from "react";
import { lireGrowText } from "../texts/lireGrowText";

const useLireGrow = () => {
  const example: string[] = lireGrowText.example.split(" ");
  const phrases: string[] = lireGrowText.phrases;
  const [phrase, setPhrase] = useState<string[]>(example);
  const [currentIndex, setCurrentIndex] = useState(example.length + 1);
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [chosenImg, setChosenImg] = useState<string | null>(null);
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const currentPartRef = useRef<HTMLSpanElement | null>(null);
  const imgsRef: string[] = ["errada1", "errada2", "certa"];
  const punctuationRegex = /[.,!?;:"()'-]/g;

  useEffect(() => {
    if (currentPartRef.current) {
      currentPartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const removeAccents = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const imgsPaths = (phrase: string[]) => {
    const imgFolder = removeAccents(
      `/lireGrowImgs/${phrase
        .join("_")
        .toLowerCase()
        .replace(punctuationRegex, "")}`
    );

    return imgsRef
      .map((img) => `${imgFolder}/${img}.png`)
      .sort(() => Math.random() - 0.5);
  };

  const [shuffledImgsPaths, setShuffledImgsPaths] = useState<string[]>(
    imgsPaths(example)
  );

  const initializePhrase = (phrase: string[]) => {
    setPhrase(phrase);
    setCurrentIndex(1);
    setShuffledImgsPaths(imgsPaths(phrase));
    setCorrectAnswer(null);
    setChosenImg(null);
    setSummaryClose(true);
  };

  const selectedPhrase = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenPhrase = event.target.value.split(" ");
    initializePhrase(chosenPhrase);
  };

  const nextPart = () => {
    if (currentIndex <= phrase.length) setCurrentIndex(currentIndex + 1);
  };

  const selectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenImg(event.target.id);
  };

  const checkAnswer = () => {
    setCorrectAnswer(chosenImg !== null && chosenImg.includes("certa"));
  };

  const randomPhrase = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex].split(" ");
    initializePhrase(randomPhrase);
  };

  const fontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setFontSize(value);

    const min = parseFloat(event.target.min);
    const max = parseFloat(event.target.max);
    const percent = ((value - min) / (max - min)) * 100;
    event.target.style.setProperty("--progress", `${percent}%`);
  };

  return {
    phrase,
    currentIndex,
    correctAnswer,
    shuffledImgsPaths,
    currentPartRef,
    chosenImg,
    summaryClose,
    fontSize,
    selectedPhrase,
    nextPart,
    selectedImg,
    checkAnswer,
    randomPhrase,
    fontSizeChange,
  };
};

export default useLireGrow;
