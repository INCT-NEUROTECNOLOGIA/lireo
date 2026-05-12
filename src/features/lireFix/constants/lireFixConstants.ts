// LireFix activity constants and messages

export const LIRE_FIX_MESSAGES = {
  // Feedback messages when user selects a word
  CORRECT_WORD_SELECTED: 'Muito bem! Você identificou a palavra incorreta.',
  INCORRECT_WORD_SELECTED: 'Tente novamente. Essa palavra está correta na frase.',
  
  // Verification messages
  CORRECT_ANSWER: 'Muito bem! Você escolheu a palavra correta.',
  INCORRECT_ANSWER: 'Tente novamente. Essa não é a palavra correta.',
  
  // Default explanation
  DEFAULT_EXPLANATION: 'Essa é a palavra mais adequada para a frase.',
};

export const LIRE_FIX_DEFAULTS = {
  INITIAL_FONT_SIZE: 24,
  MIN_FONT_SIZE: 16,
  MAX_FONT_SIZE: 60,
  FONT_SIZE_STEP: 1,
};

export const LIRE_FIX_COLORS = {
  // Incorrect word highlight color (light blue)
  INCORRECT_HIGHLIGHT: '#42A5F5',
  
  // Feedback colors
  SUCCESS_TEXT: '#1b5e20',
  SUCCESS_BORDER: '2px solid #81c784',
  ERROR_TEXT: '#c62828',
  ERROR_BORDER: '2px solid #e53935',
  
  // Info colors
  INFO_TEXT: '#0a85b8',
  INFO_BORDER: '2px solid #0a85b8',
};
