import projectActionTypes from "./types";

const INITIAL_STATE = {
  projects: [],
  isLoading: false
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case projectActionTypes.GET_USER_PROJECTS_START:
      return {
        ...state,
        isLoading: true
      };
    case projectActionTypes.GET_USER_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false
      };
    case projectActionTypes.GET_USER_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false
      };
    case projectActionTypes.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case projectActionTypes.DELETE_PROJECT_SUCCESS:
      const deletedProjectArray = state.projects.filter(
        project => project._id !== action.payload
      );
      return {
        ...state,
        projects: deletedProjectArray
      };
    case projectActionTypes.EDIT_PROJECT_SUCCESS:
      const updatedProjectArray = state.projects.map(project => {
        if (project._id === action.payload._id) {
          project = action.payload;
        }
        return project;
      });
      return {
        ...state,
        projects: updatedProjectArray
      };
    default:
      return state;
  }
};

export default projectsReducer;
