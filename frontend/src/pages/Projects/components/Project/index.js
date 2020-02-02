//Library imports
import React, { useState } from "react";
import Modal from "react-modal";

//Assets imports
import edit from "../../../../assets/edit.svg";
import trash from "../../../../assets/bin.svg";

//Component imports
import DeleteProject from "./components/DeleteProject";
import EditProject from "./components/EditProject";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

//Style imports
import "./styles.scss";

Modal.setAppElement("#root");

const Project = ({ project }) => {
  const [modalIsOpen, toggleModal] = useState(false);
  const [type, setType] = useState("");

  const handleClick = type => {
    setType(type);
    toggleModal(true);
  };

  return (
    <div className="project">
      <div className="project-header">
        <h3>Project {project.name}</h3>
        <div className="buttons-container">
          <img
            src={edit}
            height="15"
            width="15"
            alt="edit"
            onClick={() => handleClick("edit")}
          />
          <img
            src={trash}
            height="15"
            width="15"
            alt="delete"
            onClick={() => handleClick("delete")}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => toggleModal(false)}
            className="Modal"
            contentLabel="Example Modal"
          >
            {type === "delete" ? (
              <DeleteProject
                toggleModal={toggleModal}
                project_id={project._id}
              />
            ) : (
              <EditProject toggleModal={toggleModal} project_id={project._id} />
            )}
          </Modal>
        </div>
      </div>
      <div className="project-content">
        <TaskList />
        <hr />
        <AddTask />
      </div>
    </div>
  );
};

export default Project;
