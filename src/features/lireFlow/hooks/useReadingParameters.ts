import {
  AVERAGE_SYLLABLES_PER_WORD,
  ONE_MINUTE_IN_SECONDS,
  PUNCTUATION_MARKS_TIME,
} from "../constantes/ReadingConstants";

import { PERFORMANCE_LABELS } from "../constantes/ReadingPerformanceConstants";

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
        { limit: 20, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 32, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 40, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 46, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      2: [
        { limit: 27, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 42, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 53, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 60, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      3: [
        { limit: 35, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 50, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 62, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 70, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      4: [
        { limit: 40, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 56, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 70, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 80, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      5: [
        { limit: 46, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 64, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 81, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 92, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      6: [
        { limit: 51, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 70, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 88, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 101, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      7: [
        { limit: 55, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 75, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 94, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 108, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
      ],
      8: [
        { limit: 60, performance: PERFORMANCE_LABELS.SEVERE_DEFICIT },
        { limit: 80, performance: PERFORMANCE_LABELS.MODERATE_SEVERE_DEFICIT },
        { limit: 100, performance: PERFORMANCE_LABELS.MILD_DEFICIT },
        { limit: 115, performance: PERFORMANCE_LABELS.ALERT_DEFICIT },
        { limit: Infinity, performance: PERFORMANCE_LABELS.NO_DEFICIT },
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
