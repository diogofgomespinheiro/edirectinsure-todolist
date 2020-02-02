//Library imports
import React from "react";

//Style imports
import "./styles.scss";

const Project = ({ project }) => {
  return (
    <div className="project">
      <div className="project-header">
        <h3>Project {project.name}</h3>
        <div className="buttons-container"></div>
      </div>
      <div className="project-content">
        <h2>To Do</h2>
        <h2>Done</h2>
        <hr />
      </div>
    </div>
  );
};

export default Project;
