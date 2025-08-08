import React, { useEffect, useState } from 'react';
import './ProjectsShowcase.css';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

function ProjectsShowcase() {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/getallprojects`, {
          withCredentials: true,
        });

        let allProjects = response.data || [];
        // Randomly shuffle & take only 2
        const randomtwo = allProjects
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        setProject(randomtwo);
      } catch (error) {
        console.error(`project fetching error ${error}`);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="projects-showcase">
      <div className="projects-left">
        <h2>Explore Student Projects</h2>
        <div className="project-cards">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <div className="project-image">
                <img
                  src={project.coverImageUrl || 'placeholder.jpg'}
                  alt={project.title}
                />
              </div>
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>by {project.owner?.name || 'Unknown'}</p>
              </div>
            </div>
          ))}
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
          <div className="tutorial-image">
            {/* YouTube video embed
            <iframe
  width="100%"
  height="140"
  src="https://www.youtube.com/embed/wHPEBQu90Qs" 
  title="Tutorial Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe> */}
          </div>
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
