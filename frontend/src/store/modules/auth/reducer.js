import authActionTypes from "./types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    case authActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case authActionTypes.AUTH_FAILED:
    case authActionTypes.GET_USER_FAILED:
    case authActionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
