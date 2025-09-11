import { useState } from "react";
import { lireMorphText } from "../texts/lireMorphText";
import { radicals } from "../texts/radicals";

type Prefix = {
  text: string;
  positionTop: number;
  positionLeft: number;
};

const useLireMorph = () => {
  const [summaryClose, setSummaryClose] = useState<boolean>(false);
  const [radical, setRadical] = useState<string>(lireMorphText.exemple.radical);
  const ZONE_START: number = 15;
  const ZONE_END: number = 85;
  const AVOID_ZONE_START: number = 40;
  const AVOID_ZONE_END: number = 60;

  const getRandomPosition = (): number => {
    let position;

    do {
      position = Math.random() * (ZONE_END - ZONE_START) + ZONE_START;
    } while (position > AVOID_ZONE_START && position < AVOID_ZONE_END);

    return position;
  };

  const initializePrefixes = (prefixes: string[]): Prefix[] => {
    return prefixes.map((text) => ({
      text,
      positionTop: getRandomPosition(),
      positionLeft: getRandomPosition(),
    }));
  };

  const [prefixes, setPrefixes] = useState<Prefix[]>(
    initializePrefixes(lireMorphText.exemple.prefixes)
  );

  const selectedRadical = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);

    setRadical(radicals[index].radical);
    setPrefixes(initializePrefixes(radicals[index].prefixes));
    setSummaryClose(true);
  };

  return {
    radical,
    prefixes,
    summaryClose,
    selectedRadical,
  };
};

export default useLireMorph;
