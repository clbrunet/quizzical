import { useState } from 'react';

import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div className="App">
      { isQuizStarted === false
        ? <Home startQuiz={() => setIsQuizStarted(true)} />
        : <Quiz /> }
    </div>
  );
}

export default App;
