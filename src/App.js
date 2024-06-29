import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Results from './components/Results';
import axios from 'axios';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formattedQuestions, setFormattedQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(10).fill({ answerIndex: -1 })); 
  const [disable, setDisable] = useState(true);
  const [timer, setTimer] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      const data = response.data;

      const formattedQuestions = data.map((post, index) => {
        const sliceLength = Math.ceil(post.body.length / 4); 
        const options = [
          post.body.slice(0, sliceLength).trim(),        
          post.body.slice(sliceLength, 2 * sliceLength).trim(), 
          post.body.slice(2 * sliceLength, 3 * sliceLength).trim(), 
          post.body.slice(3 * sliceLength).trim()       
        ];

        return {
          question: post.title, 
          options: options
        };
      });

      setFormattedQuestions(formattedQuestions);
    } catch (error) {
      console.error(error);
      setError(true)
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer === 20) {
      setDisable(false);
    }

    if (timer === 0) {
      setDisable(true);
      if (currentQuestionIndex < formattedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(30);
      } else {
        clearInterval(interval);
        setShowResults(true);
      }
    }

    return () => clearInterval(interval);
  }, [timer, currentQuestionIndex]);

  useEffect(() => {
    if (timer === 0 && currentQuestionIndex < formattedQuestions.length - 1) {
      handleAnswer(-1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setDisable(true);
    } else if (timer === 0 && currentQuestionIndex === formattedQuestions.length - 1) {
      setShowResults(true);
    }
  }, [timer]);

  const handleAnswer = (answerIndex) => {
    setAnswers(prev => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = { question: formattedQuestions[currentQuestionIndex]?.question, answerIndex };
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < formattedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setDisable(true);
    } else {
      setShowResults(true);
    }
  };

  if(error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">

          Teste suan ulasılamıyor. Daha sonra tekrar deneyiniz.
         
    
        </div>
      </div>
    );

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        {showResults ? (
          <Results answers={answers} />
        ) : (
          <>
            {formattedQuestions.length > 0 && (
              <Question
                question={formattedQuestions[currentQuestionIndex].question}
                options={formattedQuestions[currentQuestionIndex].options}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={formattedQuestions.length}
                handleAnswer={handleAnswer}
                disable={disable}
                handleNextQuestion={handleNextQuestion}
                selectedAnswerIndex={answers[currentQuestionIndex].answerIndex}
                isLastQuestion={currentQuestionIndex === formattedQuestions.length - 1}
              />
            )}
            <div className="mt-4 text-center">
              Kalan süre: {timer} saniye
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
