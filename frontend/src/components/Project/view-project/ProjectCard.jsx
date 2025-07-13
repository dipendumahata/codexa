import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <img src={project.coverImageUrl} alt="cover" className="cover-img" />
        <div className="text-info">
          <h2>Task Management App</h2>
          <p>A web-based task management application</p>
          <a href="#">Live Demo</a>
        </div>
      </div>

      <div className="author-section">
        <img src={project.logoUrl} alt="author" className="author-img" />
        <div>
          <h4>{project.owner}</h4>
          <p className="verified">✔ Verified</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
