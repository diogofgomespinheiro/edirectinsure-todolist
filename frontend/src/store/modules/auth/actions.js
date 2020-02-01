import authActionTypes from "./types";
import axios from "../../../config/axios";
import { setAlert } from "../alert/actions";

const loginStart = () => {
  return {
    type: authActionTypes.LOGIN_START
  };
};

const loginSuccess = payload => {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload
  };
};

const loginFailed = () => {
  return {
    type: authActionTypes.LOGIN_FAILED
  };
};

export const login = ({ email, password }, history) => async dispatch => {
  dispatch(loginStart());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/users/login", body, config);
    dispatch(loginSuccess(res.data));
    history.push("/projects");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(loginFailed());
  }
};
