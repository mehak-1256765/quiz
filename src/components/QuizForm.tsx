// src/components/QuizForm.tsx
import React, { useState, useEffect } from 'react';
import ReviewAnswers from './ReviewAnswers';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch the quiz questions from local storage or server
    const savedQuiz = localStorage.getItem('quiz');
    if (savedQuiz) {
      const parsedQuiz = JSON.parse(savedQuiz);
      setQuestions(parsedQuiz);
      setAnswers(Array(parsedQuiz.length).fill(-1)); // Initialize answers array
    }
  }, []);

  const handleChange = (index: number, value: number) => {
    const updatedAnswers = answers.map((a, i) => (i === index ? value : a));
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Quiz Results</h1>
        <p>Your score: {score} / {questions.length}</p>
        <ReviewAnswers questions={questions} answers={answers} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Take the Quiz</h1>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={i}
                onChange={() => handleChange(index, i)}
                className="radio radio-primary mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizForm;

