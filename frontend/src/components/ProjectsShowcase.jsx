import React from 'react';
import './ProjectsShowcase.css';

function ProjectsShowcase() {
  return (
    <section className="projects-showcase">
      <div className="projects-left">
        <h2>Explore Student Projects</h2>
        <div className="project-cards">
          <div className="project-card">
            <div className="project-image">[Image]</div>
            <div className="project-info">
              <h4>Tack Management App</h4>
              <p>by Paye Anseen</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-image">[Image]</div>
            <div className="project-info">
              <h4>E-commerce Website</h4>
              <p>by AtiumMoseen</p>
            </div>
          </div>
        </div>

        <div className="upload-more-card">
          <h4>Explore Student Projects</h4>
          <p>Upload your tutorials and grammar...</p>
          <button className="upload-more-btn">Uploaden</button>
        </div>
      </div>

      <div className="projects-right">
        <div className="tutorial-card">
          <h3>Paid Video Tutorials</h3>
          <p>Upload tutorials. Participants get 90% revenue.</p>
          <div className="tutorial-image">[Tutorial Image]</div>
        </div>

        <div className="extra-info-cards">
          <div className="info-card">
            <h4>Jan Hackathons</h4>
            <p>Earning coding projects</p>
          </div>
          <div className="info-card">
            <h4>Live Demos & Showcases</h4>
            <p>Participate in projects</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;
