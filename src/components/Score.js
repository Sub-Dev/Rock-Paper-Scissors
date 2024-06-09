// src/components/Score.js
import React from "react";

const Score = ({ score }) => {
  return (
    <div className="score-container">
      <h2 className="score-title">SCORE</h2>
      <div className="score-value">{score}</div>
    </div>
  );
};

export default Score;
