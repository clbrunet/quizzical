import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import Question from './Question';
import './Quiz.css';

type OpenTDBQuestion = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
};

type QuestionObject = {
  title: string;
  correctAnswer: string;
  answers: string[];
};

function Quiz() {
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const [guesses, setGuesses] = useState<string[]>(["", "", "", ""]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=4&type=multiple&encode=url3986')
      .then(response => response.json())
      .then(data => setQuestions(
        data.results.map((openTDBQuestion: OpenTDBQuestion): QuestionObject => {
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
        })
      ));
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>, questionIndex: number) {
    setGuesses((prevGuesses) => prevGuesses.map((prevGuess, index) => {
      if (index === questionIndex) {
        return event.target.value;
      }
      return prevGuess;
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: to implement
    console.log("handleSubmit not implemented")
  }

  const questionsElements = questions.map((question, questionIndex) => (
    <Fragment key={question.title}>
      <Question
        title={question.title}
        answers={question.answers}
        guess={guesses[questionIndex]}
        handleChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, questionIndex)}
        />
      <hr className="question-divider"/>
    </Fragment>
  ));

  return (
    <form onSubmit={handleSubmit} className="Quiz">
      {questionsElements}
      <button className="button">Check answers</button>
    </form>
  );
}

export default Quiz;
