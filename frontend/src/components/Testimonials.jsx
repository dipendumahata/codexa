import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Singh',
      feedback: 'Uploading my projects helped me land an internship!',
    },
    {
      name: 'Rohan Mehta',
      feedback: 'The premium plan gave my projects so much visibility!',
    },
    {
      name: 'Anita Desai',
      feedback: 'I love how simple and effective this platform is.',
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-photo">[Photo]</div>
            <p className="testimonial-feedback">“{t.feedback}”</p>
            <h4 className="testimonial-name">- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
