import React from 'react';
import './Features.css';
// import placeholder from '../assets/placeholder.png';

export default function Features() {
  const cards = [
    {
      title: 'Upload Projects',
      desc: 'Upload coding projects',
    },
    {
      title: 'Earn Money',
      desc: 'Earn huge Dot idol fees!',
    },
    {
      title: 'Premium Membership',
      desc: 'Earn Dot idols to join hatx Hackathons',
    },
  ];

  return (
    <div className="features">
      {cards.map((item, index) => (
        <div className="feature-card" key={index}>
          <img  alt={item.title} />
          <div>
            <strong>{item.title}</strong>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
