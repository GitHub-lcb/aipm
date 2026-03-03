export type QuestionType = 'single' | 'multiple' | 'boolean';

export interface Question {
  id: number;
  type: QuestionType;
  category: string;
  question: string;
  options?: string[];
  answer: number[]; // Index of correct option(s)
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number[]>;
  isFinished: boolean;
  score: number;
}

export const QUIZ_CONSTANTS = {
  PASSING_SCORE: 80,
};
