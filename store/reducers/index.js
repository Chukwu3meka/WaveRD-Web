import { combineReducers } from "redux";

import error from "./error";
import layout from "./layout";

export default combineReducers({
  error,
  layout,
});
