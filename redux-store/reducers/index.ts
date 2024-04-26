import { combineReducers } from "redux";

import endpoints from "./endpoints";
import error from "./error";
import layout from "./layout";
import account from "./account";

export default combineReducers({
  error,
  layout,
  account,
  endpoints,
});
