import React from "react";

const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-display w-[80vw] max-w-[500px]">
      <h2 className="text-green-700 text-3xl font-semibold">
        Score :: {score.correct - score.incorrect}
      </h2>
      <p className="text-green-500">Correct: {score.correct}</p>
      <p className="text-red-700">Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default ScoreDisplay;
