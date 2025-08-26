import {
  AVERAGE_SYLLABLES_PER_WORD,
  ONE_MINUTE_IN_SECONDS,
  PUNCTUATION_MARKS_TIME,
} from "../constantes/ReadingConstants";

const useReadingParameters = () => {

  const averageSyllableTime = (wpm: number): number => {
    return ONE_MINUTE_IN_SECONDS / (wpm * AVERAGE_SYLLABLES_PER_WORD);
  };

  const calculateWordsPerMinute = (wpm: number, speed: number): number => {
    const currentSyllableTime = averageSyllableTime(wpm) / speed;
    const syllablesPerMinute = ONE_MINUTE_IN_SECONDS / currentSyllableTime;
    const wordsPerMinute = syllablesPerMinute / AVERAGE_SYLLABLES_PER_WORD;
    return Math.round(wordsPerMinute);
  };

  const classifyPerformance = (wordsReadPerMinute: number, level: number) => {
    const readingLevels: Record<
      number,
      { limit: number; performance: string }[]
    > = {
      1: [
        { limit: 20, performance: "Sugestivo de déficit importante" },
        { limit: 32, performance: "Déficit moderado a severo" },
        { limit: 40, performance: "Déficit leve" },
        { limit: 46, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      2: [
        { limit: 27, performance: "Sugestivo de déficit importante" },
        { limit: 42, performance: "Déficit moderado a severo" },
        { limit: 53, performance: "Déficit leve" },
        { limit: 60, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      3: [
        { limit: 35, performance: "Sugestivo de déficit importante" },
        { limit: 50, performance: "Déficit moderado a severo" },
        { limit: 62, performance: "Déficit leve" },
        { limit: 70, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      4: [
        { limit: 40, performance: "Sugestivo de déficit importante" },
        { limit: 56, performance: "Déficit moderado a severo" },
        { limit: 70, performance: "Déficit leve" },
        { limit: 80, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      5: [
        { limit: 46, performance: "Sugestivo de déficit importante" },
        { limit: 64, performance: "Déficit moderado a severo" },
        { limit: 81, performance: "Déficit leve" },
        { limit: 92, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      6: [
        { limit: 51, performance: "Sugestivo de déficit importante" },
        { limit: 70, performance: "Déficit moderado a severo" },
        { limit: 88, performance: "Déficit leve" },
        { limit: 101, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      7: [
        { limit: 55, performance: "Sugestivo de déficit importante" },
        { limit: 75, performance: "Déficit moderado a severo" },
        { limit: 94, performance: "Déficit leve" },
        { limit: 108, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
      8: [
        { limit: 60, performance: "Sugestivo de déficit importante" },
        { limit: 80, performance: "Déficit moderado a severo" },
        { limit: 100, performance: "Déficit leve" },
        { limit: 115, performance: "Alerta para o déficit" },
        { limit: Infinity, performance: "Não sugestivo de déficit" },
      ],
    };

    return readingLevels[level].find(
      (level) => wordsReadPerMinute <= level.limit
    )?.performance;
  };

  return {
    punctuationMarksTime: PUNCTUATION_MARKS_TIME,
    averageSyllableTime,
    calculateWordsPerMinute,
    classifyPerformance,
  };
};

export default useReadingParameters;
