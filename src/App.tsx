import { useState } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { Welcome } from '@/components/Welcome'
import { Quiz } from '@/components/Quiz'
import { Result } from '@/components/Result'
import { TeacherReview } from '@/components/TeacherReview'

function App() {
  const [view, setView] = useState<'normal' | 'review'>('normal');
  const { 
    state, 
    currentQuestion, 
    totalQuestions, 
    progress, 
    handleAnswer, 
    handleSelectRole,
    nextQuestion, 
    prevQuestion, 
    resetQuiz,
    questions 
  } = useQuiz();

  const handleStart = () => {
    // Role is already selected in Welcome
  };

  const handleRestart = () => {
    resetQuiz();
  };

  if (view === 'review') {
    return <TeacherReview onBack={() => setView('normal')} />;
  }

  if (!state.selectedRole) {
    return (
      <Welcome 
        onStart={handleStart} 
        totalQuestions={totalQuestions} 
        selectedRole={state.selectedRole}
        onSelectRole={handleSelectRole}
        onEnterReview={() => setView('review')}
      />
    );
  }

  if (!currentQuestion && !state.isFinished) {
    return <div className="p-10 text-red-500">Error: No questions found!</div>;
  }

  if (state.isFinished) {
    return (
      <Result 
        score={state.score} 
        answers={state.answers} 
        questions={questions} 
        onRestart={handleRestart} 
      />
    );
  }

  return (
    <Quiz 
      question={currentQuestion}
      currentAnswer={state.answers[currentQuestion.id] || []}
      currentIndex={state.currentQuestionIndex}
      totalQuestions={totalQuestions}
      progress={progress}
      timeRemaining={state.timeRemaining}
      onAnswer={(indices) => handleAnswer(currentQuestion.id, indices)}
      onNext={nextQuestion}
      onPrev={prevQuestion}
    />
  );
}

export default App
