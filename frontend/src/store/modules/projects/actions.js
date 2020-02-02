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
