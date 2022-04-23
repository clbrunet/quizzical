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
  const [score, setScore] = useState<number>(0);
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false);

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
    if (shouldShowResult === false) {
      setShouldShowResult(true);
      setScore(guesses.reduce((acc, guess, index) => {
        if (guess === questions[index].correctAnswer) {
          return acc + 1;
        }
        return acc;
      }, 0));
    } else {
      // TODO play again
      console.log('Play again not yet implemented');
    }
  }

  const questionsElements = questions.map((question, questionIndex) => (
    <Fragment key={question.title}>
      <Question
        title={question.title}
        correctAnswer={question.correctAnswer}
        answers={question.answers}
        guess={guesses[questionIndex]}
        handleChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, questionIndex)}
        shouldShowResult={shouldShowResult}
        />
      <hr className="question-divider"/>
    </Fragment>
  ));

  return (
    <form onSubmit={handleSubmit} className="Quiz">
      {questionsElements}
      <div className="score-button-container">
        {shouldShowResult && <h5>You scored {score}/{guesses.length} correct answers</h5>}
        <button className="button">
          {shouldShowResult ? "Play again" : "Check answers"}
        </button>
      </div>
    </form>
  );
}

export default Quiz;
