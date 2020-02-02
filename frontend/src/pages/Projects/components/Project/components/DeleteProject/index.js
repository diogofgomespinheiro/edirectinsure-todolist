//Library imports
import React from "react";
import { useDispatch } from "react-redux";

//Redux
import { deleteProject } from "../../../../../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

const DeleteProject = ({ toggleModal, project_id }) => {
  const dispatch = useDispatch();
  const onDeleteProject = project_id => dispatch(deleteProject(project_id));

  return (
    <div className="delete-project">
      <h2>Are you sure you want to delete this project?</h2>
      <div className="buttons">
        <button onClick={() => toggleModal(false)}>Cancel</button>
        <button
          onClick={() => {
            onDeleteProject(project_id);
            toggleModal(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
