import { combineReducers } from "redux";

import mass from "./mass";
import club from "./club";
import error from "./error";
import layout from "./layout";
import player from "./player";
import profile from "./profile";

export default combineReducers({
  mass,
  club,
  error,
  layout,
  player,
  profile,
});
