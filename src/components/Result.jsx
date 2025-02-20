import React from 'react'

export default function Result({score,onRestart,totalQuestions}) {
  return (
    <div className="result-container container mt-5">
      <div className="card shadow-lg p-4 text-center">
        <h1 className="mb-4">Quiz Results</h1>
        <h2 className="display-4 mb-4">
          Your Score: {score} / {totalQuestions}
        </h2>
        <p className="lead mb-4">
          {score === totalQuestions
            ? "Congratulations! You aced the quiz!"
            : score > totalQuestions / 2
            ? "Well done! You passed the quiz."
            : "Keep practicing! You can do better next time."}
        </p>
        <button
          className="btn btn-primary btn-lg restart-button"
          onClick={onRestart}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  )
}
