import './Home.css';

type HomeProps = {
  startQuiz: () => void
};

function Home(props: HomeProps) {
  return (
    <div className="Home">
      <h1>Quizzical</h1>
      <p>General Knowledge Quiz</p>
      <button className="button" onClick={props.startQuiz}>Start quiz</button>
    </div>
  );
}

export default Home;
