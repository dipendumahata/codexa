import React from "react";
import "./LearningSection.css";

const LearningSection = ({ learning }) => {
  return (
    <div className="learning-section">
      <h3>What You'll Learn</h3>
      <ul>
        {learning.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default LearningSection;
