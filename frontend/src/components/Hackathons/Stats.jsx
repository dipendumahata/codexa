import React from 'react';
import './Stats.css';
// import placeholder from '../assets/placeholder.png';

export default function Stats() {
  return (
    <div className="stats">
      <h2>Hackathon Stats</h2>
      <p><strong>25</strong> Competitions</p>
      <p><strong>88</strong> Participants</p>
      <p><strong>385</strong> Submissions</p>

      <h3>Participants</h3>
      <div className="participant">
        <img  alt="User" />
        <div>
          <strong>Sheha R:</strong>
          <p>CodeBazaar has demystified student backs and helped me tigare out how data works.</p>
        </div>
      </div>
    </div>
  );
}
