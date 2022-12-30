import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import layout from "./layout";

export default combineReducers({
  error,
  layout,
  auth,
});
