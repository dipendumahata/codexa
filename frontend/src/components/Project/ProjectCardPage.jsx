// File: ProjectCardPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectCard from './ProjectCard';

const ProjectCardPage = () => {
  const { id } = useParams();

  return <ProjectCard id={id} />;
};

export default ProjectCardPage;
