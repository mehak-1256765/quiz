// src/components/AdminPanel.tsx
import React from 'react';
import { Question } from './type'; // Adjust the import path for your Question type

interface QuizQuestionsProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ questions }) => {
  return (
    <div>
      <h2>Quiz Questions</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>{q.question}</strong>
            <ul>
              {q.options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, optionIndex: React.Key | null | undefined) => (
                <li key={optionIndex}>{option}</li>
              ))}
              <li>Correct Answer Index: {q.correctAnswer}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestions;

