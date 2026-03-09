export type QuestionType = 'single' | 'multiple' | 'boolean' | 'coding';

export interface Question {
  id: number;
  type: QuestionType;
  category: string;
  question: string;
  options?: string[];
  answer: number[]; // Index of correct option(s)
  explanation: string;
  taskDescription?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number[]>;
  isFinished: boolean;
  score: number;
  timeRemaining: number; // in seconds
  selectedRole?: string;
}

export const QUIZ_CONSTANTS = {
  PASSING_SCORE: 80,
  PRACTICAL_SCORE_WEIGHT: 60,
  THEORY_SCORE_WEIGHT: 40,
  EXAM_DURATION: 60 * 60, // 60 minutes in seconds
  ROLES: ['后端开发', '前端开发', '大数据开发'],
};
