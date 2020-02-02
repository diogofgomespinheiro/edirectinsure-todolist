import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer";
import authReducer from "./modules/auth/reducer";
import projectsReducer from "./modules/projects/reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  projects: projectsReducer
});

export default rootReducer;
