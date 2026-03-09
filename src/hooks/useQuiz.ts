import { useState, useMemo, useEffect, useCallback } from 'react';
import { QUIZ_CONSTANTS, type Question, type QuizState } from '@/types/quiz';
import questionsData from '@/data/questions.json';

const questions = (questionsData || []) as Question[];
const STORAGE_KEY = 'aipm_quiz_state';

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return {
      currentQuestionIndex: 0,
      answers: {},
      isFinished: false,
      score: 0,
      timeRemaining: QUIZ_CONSTANTS.EXAM_DURATION,
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentQuestion = useMemo(() => questions[state.currentQuestionIndex], [state.currentQuestionIndex]);
  const totalQuestions = questions.length;
  const progress = ((state.currentQuestionIndex) / totalQuestions) * 100;

  const handleAnswer = (questionId: number, answerIndices: number[]) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndices,
      },
    }));
  };

  const handleSelectRole = (role: string) => {
    setState(prev => ({ ...prev, selectedRole: role }));
  };

  const finishQuiz = useCallback(() => {
    let theoryScore = 0;
    let codingScore = 0;
    
    const theoryQuestions = questions.filter(q => q.type !== 'coding');
    const codingQuestions = questions.filter(q => q.type === 'coding');

    theoryQuestions.forEach((q) => {
      const userAnswers = state.answers[q.id] || [];
      const correctAnswers = q.answer;
      
      if (userAnswers.length === correctAnswers.length && 
          userAnswers.every((val) => correctAnswers.includes(val))) {
        theoryScore++;
      }
    });

    codingQuestions.forEach((q) => {
      const userAnswers = state.answers[q.id] || [];
      if (userAnswers.length > 0 && userAnswers[0] === 0) {
        codingScore++;
      }
    });

    const finalTheoryScore = theoryQuestions.length > 0 
      ? (theoryScore / theoryQuestions.length) * QUIZ_CONSTANTS.THEORY_SCORE_WEIGHT 
      : 0;
    const finalCodingScore = codingQuestions.length > 0 
      ? (codingScore / codingQuestions.length) * QUIZ_CONSTANTS.PRACTICAL_SCORE_WEIGHT 
      : 0;

    setState((prev) => ({
      ...prev,
      isFinished: true,
      score: Math.round(finalTheoryScore + finalCodingScore),
    }));
  }, [state.answers]);

  const nextQuestion = () => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const resetQuiz = () => {
    const newState = {
      currentQuestionIndex: 0,
      answers: {},
      isFinished: false,
      score: 0,
      timeRemaining: QUIZ_CONSTANTS.EXAM_DURATION,
      selectedRole: undefined,
    };
    setState(newState);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Timer effect
  useEffect(() => {
    if (state.isFinished || !state.selectedRole) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isFinished, !!state.selectedRole]);

  // Auto-finish when time is up
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isFinished && state.selectedRole) {
      finishQuiz();
    }
  }, [state.timeRemaining, state.isFinished, state.selectedRole, finishQuiz]);

  return {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    handleAnswer,
    handleSelectRole,
    nextQuestion,
    prevQuestion,
    resetQuiz,
    questions,
  };
};
