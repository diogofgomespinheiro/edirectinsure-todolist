import projectActionTypes from "./types";
import axios from "../../../config/axios";
import { setAlert } from "../alert/actions";

const getUserProjectsStart = () => {
  return {
    type: projectActionTypes.GET_USER_PROJECTS_START
  };
};

const getUserProjectsSuccess = payload => {
  return {
    type: projectActionTypes.GET_USER_PROJECTS_SUCCESS,
    payload
  };
};

const getUserProjectsFailed = () => {
  return {
    type: projectActionTypes.GET_USER_PROJECTS_FAILED
  };
};

export const getUserProjects = () => async dispatch => {
  dispatch(getUserProjectsStart());
  try {
    const res = await axios.get("/projects");
    dispatch(getUserProjectsSuccess(res.data));
  } catch (err) {
    dispatch(getUserProjectsFailed());
  }
};

const addProjectSuccess = payload => {
  return {
    type: projectActionTypes.ADD_PROJECT_SUCCESS,
    payload
  };
};

export const addProject = name => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post("/projects", body, config);
    dispatch(addProjectSuccess(res.data));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};

const deleteProjectSuccess = payload => {
  return {
    type: projectActionTypes.DELETE_PROJECT_SUCCESS,
    payload
  };
};

export const deleteProject = id => async dispatch => {
  try {
    await axios.delete(`/projects/${id}`);
    dispatch(deleteProjectSuccess(id));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};

const editProjectSuccess = payload => {
  return {
    type: projectActionTypes.EDIT_PROJECT_SUCCESS,
    payload
  };
};

export const editProject = (id, name) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.put(`/projects/${id}`, body, config);
    dispatch(editProjectSuccess(res.data));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};

const addTaskSuccess = payload => {
  return {
    type: projectActionTypes.ADD_TASK_SUCCESS,
    payload
  };
};

export const addTask = (project_id, description) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ description });

  try {
    const res = await axios.post(`/projects/${project_id}/tasks`, body, config);
    dispatch(addTaskSuccess(res.data));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};

const deleteTaskSuccess = payload => {
  return {
    type: projectActionTypes.DELETE_TASK_SUCCESS,
    payload
  };
};

export const deleteTask = (project_id, task_id) => async dispatch => {
  try {
    const res = await axios.delete(`/projects/${project_id}/tasks/${task_id}`);
    dispatch(deleteTaskSuccess(res.data));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};

const editTaskSuccess = payload => {
  return {
    type: projectActionTypes.EDIT_TASK_SUCCESS,
    payload
  };
};

export const editTask = (
  project_id,
  task_id,
  { completed = undefined, description = undefined, finish_date = undefined }
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ description, completed, finish_date });

  try {
    const res = await axios.patch(
      `/projects/${project_id}/tasks/${task_id}`,
      body,
      config
    );
    dispatch(editTaskSuccess(res.data));
  } catch (err) {
    dispatch(setAlert("There was an error, try again please.", "danger"));
  }
};
