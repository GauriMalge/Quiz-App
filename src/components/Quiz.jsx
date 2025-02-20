import React, { useEffect, useState } from "react";
import Question from "./Question";

export default function Quiz({ onFinishQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function fetchingData() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
        );
        const data = await response.json();

        
        const formattedQuestions = data.results.map((question) => ({
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          answer: question.correct_answer,
        }));

        setQuestions(formattedQuestions);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    }

    fetchingData();
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onFinishQuiz(score);
    }
  };

  if (isLoading) {
    return  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  }

  if (questions.length === 0) {
    return  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="alert alert-danger" role="alert">
      No questions found. Please try again later.
    </div>
  </div>
  }

  return (
    <div className="quiz-container container mt-5">
    <div className="card shadow-lg p-4">
      <h1 className="text-center mb-4">Quiz App</h1>
      <div className="progress mb-4">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          aria-valuenow={currentQuestion + 1}
          aria-valuemin="0"
          aria-valuemax={questions.length}
        >
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      <Question
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        onAnswer={handleAnswer}
      />
    </div>
  </div>
  );
}