//Library imports
import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Style imports
import "./styles.scss";

const Projects = () => {
  const token = useSelector(state => state.auth.token);

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="projects-container"></div>
      <div className="projects-form-container"></div>
    </div>
  );
};

export default Projects;
