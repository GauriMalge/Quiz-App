import { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
    setShowResult(true);
  };

  const onRestart = ()=>{
    setShowResult(false)
  }

  return (
         <div>
          <h1>Quiz App</h1>
            {!showResult ? (<Quiz onFinishQuiz={handleFinishQuiz} />) : (<Result score={score} totalQuestions={10} onRestart={onRestart}/>)}
         </div>
   

  );
}

export default App;
