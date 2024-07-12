import { removeErrorAction, catchErr } from "./error";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { AppDispatch } from "interfaces/redux-store/store.interface";

export const setGamesProfileAction = (data: Profile) => (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "SET_GAMES_PROFILE", data });
    dispatch(removeErrorAction("SET_GAMES_PROFILE"));
  } catch (err) {
    catchErr(dispatch, err, "SET_GAMES_PROFILE");
  }
};
