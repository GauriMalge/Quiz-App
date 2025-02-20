import React from 'react'

export default function Question({question,onAnswer,options}) {
  return (
    <div className="question-container">
      <h3 className="mb-4">{question}</h3>
      <ul className="list-unstyled">
        {options.map((option, index) => (
          <li key={index} className="mb-3">
            <button
              className="btn btn-outline-primary w-100 p-3 option-button"
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
