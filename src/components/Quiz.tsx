import { ChangeEvent, useEffect, useState } from 'react';
import './Quiz.css';

type OpenTDBQuestion = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
};

type Question = {
  title: string;
  correctAnswer: string;
  answers: string[];
};

function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [guesses, setGuesses] = useState<string[]>(["", "", "", ""]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=4&type=multiple&encode=url3986')
      .then(response => response.json())
      .then(data => setQuestions(data.results.map((openTDBQuestion: OpenTDBQuestion): Question => {
        const correctAnswer = decodeURIComponent(openTDBQuestion.correct_answer);
        const correctAnswerIndex = Math.floor(Math.random() * 4);
        const answers = openTDBQuestion.incorrect_answers.map(
          incorrectAnswer => decodeURIComponent(incorrectAnswer)
        )
        answers.splice(correctAnswerIndex, 0, correctAnswer);
        return {
          title: decodeURIComponent(openTDBQuestion.question),
          correctAnswer: correctAnswer,
          answers: answers,
        };
      })));
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>, questionIndex: number) {
    setGuesses((prevGuesses) => prevGuesses.map((prevGuess, index) => {
      if (index == questionIndex) {
        return event.target.value;
      }
      return prevGuess;
    }));
  }

  const questionsElements = questions.map((question, questionIndex) => {
    const answersElements = question.answers.map(answer => (
      <div key={answer}>
        <label htmlFor={answer}>
          {answer}
        </label>
        <input
          type="radio"
          id={answer}
          value={answer}
          checked={guesses[questionIndex] === answer}
          onChange={(event) => handleChange(event, questionIndex)}
          />
      </div>
    ));
    return (
      <div key={question.title}>
        <h2>{question.title}</h2>
        {answersElements}
      </div>
    )
  });

  return (
    <div className="Quiz">
      {questionsElements}
    </div>
  );
}

export default Quiz;
