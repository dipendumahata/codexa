import React from 'react';
import './PlanSection.css';

function PlanSection() {
  return (
    <section className="plan-section">
      <h2>Compare Plans</h2>
      <div className="plans-container">
        <div className="plan-card free-plan">
          <h3>Free Plan</h3>
          <ul>
            <li>Upload Projects</li>
            <li>Limited Views</li>
            <li>No Revenue Share</li>
          </ul>
          <button className="choose-btn">Free</button>
        </div>
        <div className="plan-card premium-plan">
          <h3>Premium Plan</h3>
          <ul>
            <li>Upload Unlimited Projects</li>
            <li>Featured Listing</li>
            <li>Earn Revenue</li>
          </ul>
          <button className="choose-btn">Upgrade</button>
        </div>
      </div>
    </section>
  );
}

export default PlanSection;
