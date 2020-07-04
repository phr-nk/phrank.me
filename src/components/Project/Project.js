import React from "react";
import "./Project.css";
const Project = ({ project }) => {
  return (
    <div className="project-card">
      <img className="project-image" alt="project.name" src={project.img} />

      <div className="project-text">
        <div className="project-title">{project.name}</div>
        <div className="project-subtitle">{project.subtitle}</div>
      </div>
    </div>
  );
};

export default Project;
