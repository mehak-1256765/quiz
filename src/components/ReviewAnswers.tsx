// src/components/ReviewAnswers.tsx
import React from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ReviewAnswersProps {
  questions: Question[];
  answers: number[];
}

const ReviewAnswers: React.FC<ReviewAnswersProps> = ({ questions, answers }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Review Your Answers</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p>{q.question}</p>
          {q.options.map((option, i) => (
            <p key={i} className={`
              ${answers[index] === i ? 'text-red-500' : ''}
              ${q.correctAnswer === i ? 'text-green-500' : ''}
            `}>
              {option}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ReviewAnswers;
