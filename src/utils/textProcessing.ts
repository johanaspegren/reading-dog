export interface Question {
  id: number;
  question: string;
  type: 'open' | 'rating';
  options?: number[];
}

export const calculateReadingAccuracy = (originalText: string, spokenText: string): number => {
  const originalWords = originalText.toLowerCase().split(/\s+/);
  const spokenWords = spokenText.toLowerCase().split(/\s+/);
  
  let correctWords = 0;
  spokenWords.forEach((word, index) => {
    if (originalWords[index] === word) {
      correctWords++;
    }
  });

  return (correctWords / originalWords.length) * 100;
};

export const generateQuestions = (text: string): Question[] => {
  return [
    {
      id: 1,
      question: "What is the main idea of this text?",
      type: "open"
    },
    {
      id: 2,
      question: "Did you find any words difficult to pronounce?",
      type: "open"
    },
    {
      id: 3,
      question: "How well do you think you understood the text?",
      type: "rating",
      options: [1, 2, 3, 4, 5]
    }
  ];
};