import authActionTypes from "./types";
import projectActionTypes from "../projects/types";
import axios, { setAuthToken } from "../../../config/axios";
import { setAlert } from "../alert/actions";

const authSuccess = payload => {
  return {
    type: authActionTypes.AUTH_SUCCESS,
    payload
  };
};

const authFailed = () => {
  return {
    type: authActionTypes.AUTH_FAILED
  };
};

export const auth = (
  { email, password, name = undefined },
  history,
  url
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password, name });

  try {
    const res = await axios.post(url, body, config);
    dispatch(authSuccess(res.data));
    setAuthToken(res.data.token);
    history.push("/projects");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(authFailed());
  }
};

export const register = ({ email, password }) => async dispatch => {};

const getUserSuccess = payload => {
  return {
    type: authActionTypes.GET_USER_SUCCESS,
    payload
  };
};

const getUserFailed = () => {
  return {
    type: authActionTypes.GET_USER_FAILED
  };
};

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get("/users/me");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    setAuthToken();
    dispatch(getUserFailed());
  }
};

export const logout = () => dispatch => {
  dispatch({ type: authActionTypes.LOGOUT });
  dispatch({ type: projectActionTypes.CLEAR_PROJECTS });
};
