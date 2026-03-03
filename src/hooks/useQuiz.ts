import { useState, useMemo } from 'react';
import type { Question, QuizState } from '@/types/quiz';
import questionsData from '@/data/questions.json';

const questions = (questionsData || []) as Question[];

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isFinished: false,
    score: 0,
  });

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

  const finishQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      const userAnswers = state.answers[q.id] || [];
      const correctAnswers = q.answer;
      
      if (userAnswers.length === correctAnswers.length && 
          userAnswers.every((val) => correctAnswers.includes(val))) {
        score++;
      }
    });

    setState((prev) => ({
      ...prev,
      isFinished: true,
      score: Math.round((score / totalQuestions) * 100),
    }));
  };

  const resetQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      isFinished: false,
      score: 0,
    });
  };

  return {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    resetQuiz,
    questions,
  };
};
