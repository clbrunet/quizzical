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
    <div key={answer}>
      <label htmlFor={answer}>
        {answer}
      </label>
      <input
        type="radio"
        id={answer}
        value={answer}
        checked={props.guess === answer}
        onChange={props.handleChange}
        />
    </div>
  ));

  return (
    <div className="Question">
      <h2>{props.title}</h2>
      {answersElements}
    </div>
  );
}

export default Question;
