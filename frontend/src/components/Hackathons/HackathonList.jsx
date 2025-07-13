// src/components/HackathonList.jsx
import React from 'react';
import './HackathonList.css';

const hackathons = [
  {
    id: 1,
    title: 'Code Clash 2025',
    description: 'A national-level coding challenge for college students.',
    image: '/assets/hack1.jpg',
  },
  {
    id: 2,
    title: 'Hack the Future',
    description: 'Innovate and build AI-powered tools with teams.',
    image: '/assets/hack2.jpg',
  },
  {
    id: 3,
    title: 'DevStorm',
    description: 'A 48-hour hackathon focused on real-world problem solving.',
    image: '/assets/hack3.jpg',
  },

];

function HackathonList() {
  return (
    <div className="upcoming">
      <h2>Upcoming Hackathons</h2>
      {hackathons.map((hack) => (
        <div className="card" key={hack.id}>
          <img src={hack.image} alt={hack.title} />
          <div className="card-content">
            <h3>{hack.title}</h3>
            <p>{hack.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HackathonList;
