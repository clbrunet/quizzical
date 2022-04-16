import './Home.css';

type HomeProps = {
  startQuiz: () => void
};

function Home(props: HomeProps) {
  return (
    <div className="Home">
      <h1 className="Home-title">Quizzical</h1>
      <p>General Knowledge Quiz</p>
      <button className="Home-button" onClick={props.startQuiz}>Start quiz</button>
    </div>
  );
}

export default Home;
