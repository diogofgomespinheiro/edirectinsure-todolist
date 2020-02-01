import { combineReducers } from "redux";

import alertReducer from "./modules/alert/reducer.js";

const rootReducer = combineReducers({
  alert: alertReducer
});

export default rootReducer;
