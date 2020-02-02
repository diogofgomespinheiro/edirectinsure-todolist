//Library imports
import React, { useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Component imports
import CreateProject from "./components/CreateProject";
import Project from "./components/Project";

//Redux
import { getUserProjects } from "../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

const Projects = () => {
  const token = useSelector(state => state.auth.token);
  const projects = useSelector(state => state.projects.projects);

  const dispatch = useDispatch();
  const onGetUserProjects = useCallback(() => dispatch(getUserProjects()), [
    dispatch
  ]);

  useEffect(() => {
    onGetUserProjects();
  }, [onGetUserProjects]);

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="projects-container">
        {projects.map(project => (
          <Project project={project} key={project._id} />
        ))}
      </div>
      <div className="projects-form-container">
        <CreateProject />
      </div>
    </div>
  );
};

export default Projects;
