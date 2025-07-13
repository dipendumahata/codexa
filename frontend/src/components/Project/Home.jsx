import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects/getallprojects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard
            key={project._id || index}
            title={project.title}
            description={project.description}
            user={project.owner?.username || 'Unknown'}
            stars={project.stars || 0}
            tags={project.tags || []}
          />
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default Home;
