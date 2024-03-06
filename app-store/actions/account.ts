import { AppDispatch } from "interfaces/redux-store/store.interface";
import { setThemeAction } from ".";
import { removeErrorAction, catchErr } from "./error";
import { Profile } from "interfaces/redux-store/account.interfaces";

export const setProfileAction = (data: Profile) => (dispatch: AppDispatch) => {
  try {
    dispatch(setThemeAction(data.theme));
    dispatch({ type: "SET_PROFILE", data });
    dispatch(removeErrorAction("SET_PROFILE"));
  } catch (err) {
    catchErr(dispatch, err, "SET_PROFILE");
  }
};
