import React from "react";

import Project from "./Project";

const ProjectContainer = ({ projects }) => {
  return <Project key={project.name} project={project} />;
};

export default ProjectContainer;
