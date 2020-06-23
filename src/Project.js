import React from "react";

const Project = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <img className="project-image" alt="project.name" src={project.img} />

      <div className="project-text">
        <div className="project-title">{project.name}</div>
        <div className="project-subtitle">{project.subtitle}</div>
      </div>
    </div>
  );
};

export default Project;
