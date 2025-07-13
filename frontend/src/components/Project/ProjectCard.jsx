import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  if (!project) return null;

  return (
    <div className="project-card">
      <div className="project-header">
        <img
          src={project.logoUrl || 'https://placehold.co/52'}
          alt="Project Logo"
          className="avatar"
        />

        <div className="project-info">
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="project-owner">
            <img
              src={project.owner?.profilePicture || 'https://placehold.co/32'}
              alt="Owner"
              className="owner-avatar"
            />
            <div className="owner-meta">
              <span className="owner-name">
                {project.owner?.username || 'Unknown'}
              </span>
              <span className="owner-role">Student Developer</span>
            </div>
          </div>

          <div className="meta">
            <span className="star"><FaStar /> {project.stars || 0}</span>
            {project.tags?.map((tag, i) => (
              <span key={i} className="tags">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="project-actions">
        <button className="purchase-btn">Purchase Project</button>
        <button
          className="view-btn"
          onClick={() => navigate(`/projects/${project._id}`)}
        >
          View Details
        </button>
        <button className="like-btn"><FaHeart /></button>
      </div>
    </div>
  );
};

export default ProjectCard;
