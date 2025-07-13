import React from 'react';
import './Features.css';

// ✅ Import images properly
import plcp from '../assets/plcp.png';
import em from '../assets/em.png';
import pm from '../assets/pm.png';

function Features() {
  const features = [
    {
      title: 'Upload Coding Projects',
      description: 'Upload coding projects',
      image: plcp,
    },
    {
      title: 'Earn Money',
      description: 'Earn cash for your projects',
      image: em,
    },
    {
      title: 'Get a Premium Membership',
      description: 'Unlock more features and visibility',
      image: pm,
    },
  ];

  return (
    <section className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              <img src={feature.image} alt={feature.title} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
