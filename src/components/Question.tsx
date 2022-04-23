import { ChangeEvent } from 'react';
import './Question.css';

type QuestionProps = {
  title: string;
  correctAnswer: string;
  answers: string[];
  guess: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  shouldShowResult: boolean;
};

function Question(props: QuestionProps) {
  const answersElements = props.answers.map(answer => {
    let answerLabelClassNames = "answer-label";
    if (props.shouldShowResult) {
      if (answer === props.correctAnswer) {
        answerLabelClassNames += " answer-label-correct";
      } else if (props.guess === answer) {
        answerLabelClassNames += " answer-label-wrong";
      }
    }
    return (
      <div key={answer} className="answer-container">
        <input
          type="radio"
          id={answer}
          name={props.title}
          value={answer}
          checked={props.shouldShowResult === false && props.guess === answer}
          onChange={props.handleChange}
          disabled={props.shouldShowResult}
          />
        <label htmlFor={answer} className={answerLabelClassNames}>
          {answer}
        </label>
      </div>
    )
  });

  return (
    <>
      <h2 className="question-title">{props.title}</h2>
      <div className="answers-container">
        {answersElements}
      </div>
    </>
  );
}

export default Question;
