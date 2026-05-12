import { useEffect, useMemo, useState } from 'react';
import { Phrase } from '../texts/lireFixPhrases.ts';

export default function useLireFix(initialPhrases: Phrase[]) {
  const [phraseId, setPhraseId] = useState<string>(initialPhrases[0]?.id || '');

  const phrase = useMemo(() => {
    return initialPhrases.find((p) => p.id === phraseId) || initialPhrases[0];
  }, [phraseId, initialPhrases]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
    setShowExplanation(false);
    setIsCorrect(null);
  }, [phraseId]);

  function verify() {
    if (selectedIndex === null) return;
    const chosen = phrase.alternatives[selectedIndex];
    const correct = phrase.correctWord;
    const ok = chosen.replace(/\.+$/, '') === correct.replace(/\.+$/, '');
    setIsCorrect(ok);
    setShowExplanation(true);
  }

  return {
    phraseId,
    setPhraseId,
    phrase,
    selectedIndex,
    setSelectedIndex,
    showExplanation,
    isCorrect,
    verify,
    phrases: initialPhrases,
  };
}
