import { useState } from 'react';

import './App.css';
import Home from './components/Home'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div className="App">
      {isQuizStarted === false && <Home startQuiz={() => setIsQuizStarted(true)} />}
    </div>
  );
}

export default App;
