import React from 'react';
import './Hero.css';
import heroImage from '../assets/hero1.png';  // <-- Actual image ka path

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Hackathons</h1>
        <p>
          Join our interactive hackathons and earn money by uploading projects for challenges.
        </p>
        <button className="browse-btn">Browse Competitions</button>
      </div>
      <img src={heroImage} alt="Hero" />  {/* <-- Correct image usage */}
    </section>
  );
}
