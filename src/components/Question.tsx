import { ChangeEvent } from 'react';
import './Question.css';

type QuestionProps = {
  title: string;
  answers: string[];
  guess: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Question(props: QuestionProps) {
  const answersElements = props.answers.map(answer => (
    <div key={answer} className="answer-container">
      <input
        type="radio"
        id={answer}
        name={props.title}
        value={answer}
        checked={props.guess === answer}
        onChange={props.handleChange}
        />
      <label htmlFor={answer} className="answer-label">
        {answer}
      </label>
    </div>
  ));

  return (
    <div className="Question">
      <h2 className="question-title">{props.title}</h2>
      <div className="answers-container">
        {answersElements}
      </div>
    </div>
  );
}

export default Question;
