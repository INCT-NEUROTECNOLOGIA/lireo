const useReadingParameters = () => {
  const averageSyllablesPerWord = 2.5;
  const minute = 60000;

  const punctuationMarksTime = [
    { mark: ".", time: 400 },
    { mark: ",", time: 200 },
    { mark: ";", time: 400 },
    { mark: "!", time: 500 },
    { mark: "?", time: 500 },
    { mark: ":", time: 400 },
    { mark: "-", time: 200 },
  ];

  const averageSyllableTime = (wpm: number): number => {
    return minute / (wpm * averageSyllablesPerWord);
  };

  const calculateWordsPerMinute = (wpm: number, speed: number): number => {
    const currentSyllableTime = averageSyllableTime(wpm) / speed;
    const syllablesPerMinute = minute / currentSyllableTime;
    const wordsPerMinute = syllablesPerMinute / averageSyllablesPerWord;
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
    punctuationMarksTime,
    averageSyllableTime,
    calculateWordsPerMinute,
    classifyPerformance,
  };
};

export default useReadingParameters;
