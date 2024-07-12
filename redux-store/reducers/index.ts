import { combineReducers } from "redux";

import endpoints from "./endpoints";
import error from "./error";
import layout from "./layout";
import account from "./account";
import games from "./games";

export default combineReducers({
  error,
  layout,
  account,
  endpoints,
  games,
});
