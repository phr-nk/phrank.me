import React from "react";
import "./Project.css";
function Project(props) {
  return (
    <div className="project-card">
      <div className="project-text">
        <div className="project-title">{props.name}</div>
        <div className="project-subtitle">{props.subtitle}</div>
      </div>
      <a href={props.link} target= "_blank" rel="noopener noreferrer">
        {" "}
        <img
          className="project-image"
          alt="project.name"
          src={props.img}
        />{" "}
      </a>
    </div>
  );
}

export default Project;
