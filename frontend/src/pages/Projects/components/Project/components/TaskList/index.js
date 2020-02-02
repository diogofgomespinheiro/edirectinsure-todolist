//Library imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import Moment from "react-moment";

//Assets
import trash from "../../../../../../assets/bin.svg";

//Component imports
import EditTask from "../EditTask";

//Redux
import {
  deleteTask,
  editTask
} from "../../../../../../store/modules/projects/actions";

//Style imports
import "./styles.scss";

Modal.setAppElement("#root");

const TaskList = ({ tasks, project_id }) => {
  const [modalIsOpen, toggleModal] = useState(false);
  const [selectedTask, setSeletectedTask] = useState("");

  const dispatch = useDispatch();

  const onDeleteTask = task_id => dispatch(deleteTask(project_id, task_id));
  const onEditTask = (
    task_id,
    completed = undefined,
    description = undefined,
    finish_date = undefined
  ) =>
    dispatch(
      editTask(project_id, task_id, { completed, description, finish_date })
    );

  const toDoTasks = tasks.map(task => {
    if (!task.completed) {
      return (
        <div key={task._id} className="task">
          <input type="checkbox" onClick={() => onEditTask(task._id, true)} />
          <span
            data-tip
            data-for={task._id}
            onClick={() => {
              setSeletectedTask(task);
              toggleModal(true);
            }}
          >
            {task.description}
          </span>
          <img
            src={trash}
            alt="delete"
            height="12"
            width="12"
            onClick={() => onDeleteTask(task._id)}
          />
          {task.finish_date && (
            <ReactTooltip id={task._id}>
              End date : <Moment format="DD/MM/YYYY">{task.finish_date}</Moment>
            </ReactTooltip>
          )}
        </div>
      );
    }
    return null;
  });

  const doneTasks = tasks.map(task => {
    if (task.completed) {
      return (
        <div key={task._id} className="task completed">
          <span>{task.description}</span>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="task-list">
      <h2>To Do</h2>
      {toDoTasks}
      <h2 className="done">Done</h2>
      {doneTasks}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => toggleModal(false)}
        className="Modal"
        contentLabel="Example Modal"
      >
        <EditTask
          toggleModal={toggleModal}
          onEditTask={onEditTask}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
