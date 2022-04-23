import { useState } from 'react';

import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  function incrementQuizKey() {
    setQuizKey((prevQuizKey) => prevQuizKey + 1);
  }

  return (
    <div className="App">
      { isQuizStarted === false
        ? <Home startQuiz={() => setIsQuizStarted(true)} />
        : <Quiz key={quizKey} resetComponent={incrementQuizKey} /> }
    </div>
  );
}

export default App;
