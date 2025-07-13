import React from "react";
import "./ReviewsSection.css";

const ReviewsSection = () => {
  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      <div className="review">
        <img src="https://i.pravatar.cc/50" alt="user" />
        <div>
          <p className="username">AnumMosen</p>
          <p className="time">2 days ago</p>
        </div>
        <span>⭐⭐⭐⭐⭐</span>
      </div>
      <input placeholder="Add a comment..." />
      <button>POST</button>
      <div className="actions">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔗 Share</span>
      </div>
    </div>
  );
};

export default ReviewsSection;
