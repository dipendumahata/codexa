import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './ProjectList.css';
const API_URL = import.meta.env.VITE_API_URL;


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects/getallprojects`,{
        withCredentials:true
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
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
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

export default ProjectList;
