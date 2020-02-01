import authActionTypes from "./types";

const INITIAL_STATE = {
  isLoading: false,
  token: localStorage.getItem("token"),
  user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    case authActionTypes.LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
