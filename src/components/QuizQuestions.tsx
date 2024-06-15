import React, { useState, useEffect } from 'react';

interface Question {
  question_string: string;
  choices: {
    correct: string;
    wrong: string[];
  };
}

interface QuizQuestion extends Omit<Question, 'choices'> {
  choices: string[]; // Override to use string[] for choices
  user_choice_index: number | null;
  correct_choice_index: number;
  answered_correctly: boolean | null;
}

const all_questions: Question[] = [
  {
    question_string: "What color is the sky?",
    choices: {
      correct: "Blue",
      wrong: ["Pink", "Orange", "Green"]
    }
  },
  {
    question_string: "Which of the following elements aren’t introduced in HTML5?",
    choices: {
      correct: "<input>",
      wrong: ["<article>", "<footer>", "<hgroup>"]
    }
  },
  {
    question_string: "How many wheels are there on a tricycle?",
    choices: {
      correct: "Three",
      wrong: ["One", "Two", "Four"]
    }
  },
  {
    question_string: 'Who is the main character of Harry Potter?',
    choices: {
      correct: "Harry Potter",
      wrong: ["Hermione Granger", "Ron Weasley", "Voldemort"]
    }
  }
];

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const quizQuestions = all_questions.map((q) => {
      const correctChoiceIndex = Math.floor(Math.random() * (q.choices.wrong.length + 1));
      const choices = [...q.choices.wrong];
      choices.splice(correctChoiceIndex, 0, q.choices.correct);

      return {
        ...q,
        choices,
        user_choice_index: null,
        correct_choice_index: correctChoiceIndex,
        answered_correctly: null,
      } as QuizQuestion;
    });
    setQuestions(quizQuestions);
  }, []);

  const handleChoiceChange = (choiceIndex: number) => {
    const updatedQuestions = questions.map((q, index) =>
      index === currentQuestionIndex ? { ...q, user_choice_index: choiceIndex } : q
    );
    setQuestions(updatedQuestions);
  };

  const allQuestionsAnswered = questions.every(q => q.user_choice_index !== null);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const newScore = questions.reduce((acc, q) => {
      const isCorrect = q.user_choice_index === q.correct_choice_index;
      q.answered_correctly = isCorrect;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
    setScore(newScore);

    const percentage = newScore / questions.length;
    let resultMessage = '';
    if (percentage === 1) {
      resultMessage = 'Great job!';
    } else if (percentage >= 0.75) {
      resultMessage = 'You did alright.';
    } else if (percentage >= 0.5) {
      resultMessage = 'Better luck next time.';
    } else {
      resultMessage = 'Maybe you should try a little harder.';
    }
    setMessage(resultMessage);

    setShowResults(true);
  };

  const handleRetry = () => {
    const resetQuestions = questions.map(q => ({
      ...q,
      user_choice_index: null,
      answered_correctly: null,
    }));
    setQuestions(resetQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setMessage('');
    setShowResults(false);
  };

  if (questions.length === 0) {
    return null; // or display a loading indicator while questions are being loaded
  }

  return (
    <div id="quiz" className="p-4 text-white bg-blue-900">
      <h1 id="quiz-name" className="mb-4 text-2xl font-bold">My Quiz</h1>
      {!showResults ? (
        <div id="question" className="p-4 bg-black">
          {questions.length > 0 && (
            <>
              <h2 className="mb-4 text-xl font-semibold">{questions[currentQuestionIndex].question_string}</h2>
              {questions[currentQuestionIndex].choices.map((choice, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="radio"
                    id={`choice-${index}`}
                    name="choices"
                    value={index}
                    checked={questions[currentQuestionIndex].user_choice_index === index}
                    onChange={() => handleChoiceChange(index)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`choice-${index}`}
                    className={`inline-block px-4 py-2 bg-yellow-300 text-yellow-800 rounded cursor-pointer ${
                      questions[currentQuestionIndex].user_choice_index === index ? 'bg-yellow-600 text-white' : ''
                    }`}
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </>
          )}
          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Next
          </button>
          <button onClick={handleSubmit} disabled={!allQuestionsAnswered} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Submit
          </button>
        </div>
      ) : (
        <div id="quiz-results" className="p-4 bg-black">
          <p className="mb-2 text-lg font-semibold">{message}</p>
          <p className="mb-4 text-lg text-green-600">You got <b>{score}/{questions.length}</b> questions correct.</p>
          <div>
            {questions.map((q, index) => (
              <div key={index} className="mb-2">
                <p className={`mb-1 ${q.answered_correctly ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-semibold">Question {index + 1}: </span>
                  {q.question_string}
                </p>
                <p className="ml-4">
                  Your answer: {q.choices[q.user_choice_index || 0]}<br />
                  Correct answer: {q.choices[q.correct_choice_index]}
                </p>
              </div>
            ))}
          </div>
          <button onClick={handleRetry} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
