const averageSyllablesPerWord = 2.5;
const minute = 60000;

export const averageSyllableTimeByLevel = (level: number): number => {
  switch (level) {
    case 1:
      return minute / (44 * averageSyllablesPerWord);
    case 2:
      return minute / (72 * averageSyllablesPerWord);
    case 3:
      return minute / (80 * averageSyllablesPerWord);
    case 4:
      return minute / (99 * averageSyllablesPerWord);
    case 5:
      return minute / (114 * averageSyllablesPerWord);
    case 6:
      return minute / (120 * averageSyllablesPerWord);
    case 7:
      return minute / (121 * averageSyllablesPerWord);
    case 8:
      return minute / (129 * averageSyllablesPerWord);
    default:
      return 200;
  }
};

export const wordsPerMinuteBySpeed = (speed: number, level: number): number => {
  const currentSyllableTime = averageSyllableTimeByLevel(level) / speed;
  const syllablesPerMinute = minute / currentSyllableTime;
  const wordsPerMinute = syllablesPerMinute / averageSyllablesPerWord;
  return Math.round(wordsPerMinute);
};

export const classifyPerformance = (
  wordsReadPerMinute: number,
  level: number
) => {
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

  return readingLevels[level].find((level) => wordsReadPerMinute <= level.limit)
    ?.performance;
};
