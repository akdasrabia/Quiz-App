import React, { useEffect } from 'react';

const Question = ({ question, options, currentQuestionIndex, totalQuestions, handleAnswer, disable, handleNextQuestion, selectedAnswerIndex, isLastQuestion }) => {
  useEffect(() => {
  }, [currentQuestionIndex, selectedAnswerIndex]);

  const handleOptionClick = (optionIndex) => {
    handleAnswer(optionIndex);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>

      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={disable}
            className={`w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 ${selectedAnswerIndex === index ? 'bg-blue-700' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4">
        Soru {currentQuestionIndex + 1} / {totalQuestions}
      </p>
      <button
        onClick={handleNextQuestion}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        {isLastQuestion ? 'Bitir' : 'Sonraki Soru'}
      </button>
    </div>
  );
};

export default Question;
