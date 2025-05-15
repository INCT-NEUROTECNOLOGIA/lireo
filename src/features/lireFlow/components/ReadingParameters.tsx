const averageSyllablesPerWord = 2.5;
const minute = 60000;

export const averageSyllableTimeByGrade = (grade: number): number => {
  switch (grade) {
    case 2:
      return minute / (44 * averageSyllablesPerWord);
    case 3:
      return minute / (72 * averageSyllablesPerWord);
    case 4:
      return minute / (80 * averageSyllablesPerWord);
    case 5:
      return minute / (99 * averageSyllablesPerWord);
    case 6:
      return minute / (114 * averageSyllablesPerWord);
    case 7:
      return minute / (120 * averageSyllablesPerWord);
    case 8:
      return minute / (121 * averageSyllablesPerWord);
    case 9:
      return minute / (129 * averageSyllablesPerWord);
    default:
      return 200;
  }
};

export const classifyPerformance = (
  wordsReadPerMinute: number,
  grade: number
) => {
  const readingLevels: Record<
    number,
    { limit: number; performance: string }[]
  > = {
    2: [
      { limit: 20, performance: "Sugestivo de déficit importante" },
      { limit: 32, performance: "Déficit moderado a severo" },
      { limit: 40, performance: "Déficit leve" },
      { limit: 46, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    3: [
      { limit: 27, performance: "Sugestivo de déficit importante" },
      { limit: 42, performance: "Déficit moderado a severo" },
      { limit: 53, performance: "Déficit leve" },
      { limit: 60, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    4: [
      { limit: 35, performance: "Sugestivo de déficit importante" },
      { limit: 50, performance: "Déficit moderado a severo" },
      { limit: 62, performance: "Déficit leve" },
      { limit: 70, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    5: [
      { limit: 40, performance: "Sugestivo de déficit importante" },
      { limit: 56, performance: "Déficit moderado a severo" },
      { limit: 70, performance: "Déficit leve" },
      { limit: 80, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    6: [
      { limit: 46, performance: "Sugestivo de déficit importante" },
      { limit: 64, performance: "Déficit moderado a severo" },
      { limit: 81, performance: "Déficit leve" },
      { limit: 92, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    7: [
      { limit: 51, performance: "Sugestivo de déficit importante" },
      { limit: 70, performance: "Déficit moderado a severo" },
      { limit: 88, performance: "Déficit leve" },
      { limit: 101, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    8: [
      { limit: 55, performance: "Sugestivo de déficit importante" },
      { limit: 75, performance: "Déficit moderado a severo" },
      { limit: 94, performance: "Déficit leve" },
      { limit: 108, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
    9: [
      { limit: 60, performance: "Sugestivo de déficit importante" },
      { limit: 80, performance: "Déficit moderado a severo" },
      { limit: 100, performance: "Déficit leve" },
      { limit: 115, performance: "Alerta para o déficit" },
      { limit: Infinity, performance: "Não sugestivo de déficit" },
    ],
  };

  return readingLevels[grade].find((level) => wordsReadPerMinute <= level.limit)
    ?.performance;
};
