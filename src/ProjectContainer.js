import React from "react";

import Project from "./Project";

const ProjectContainer = ({ projects, projectClick }) => {
  return (
    <Project key={project.name} project={project} onClick={projectClick} />
  );
};

export default ProjectContainer;
