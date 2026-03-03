import { useState } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { Welcome } from '@/components/Welcome'
import { Quiz } from '@/components/Quiz'
import { Result } from '@/components/Result'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const { 
    state, 
    currentQuestion, 
    totalQuestions, 
    progress, 
    handleAnswer, 
    nextQuestion, 
    prevQuestion, 
    resetQuiz,
    questions 
  } = useQuiz();

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleRestart = () => {
    setIsStarted(false);
    resetQuiz();
  };

  if (!isStarted) {
    return <Welcome onStart={handleStart} totalQuestions={totalQuestions} />;
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
      onAnswer={(indices) => handleAnswer(currentQuestion.id, indices)}
      onNext={nextQuestion}
      onPrev={prevQuestion}
    />
  );
}

export default App
