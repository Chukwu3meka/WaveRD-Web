import { combineReducers } from "redux";

import account from "./account";
import error from "./error";
import layout from "./layout";

export default combineReducers({
  error,
  layout,
  account,
});
