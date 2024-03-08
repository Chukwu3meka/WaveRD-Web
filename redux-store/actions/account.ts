import { removeErrorAction, catchErr } from "./error";
import { Theme } from "interfaces/components/layouts.interface";
import { AppDispatch } from "interfaces/redux-store/store.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";

export const setThemeAction = (data: Theme) => (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "SET_THEME", data });
    dispatch(removeErrorAction("SET_THEME"));
  } catch (err) {
    return catchErr(dispatch, err, "SET_THEME");
  }
};

export const setProfileAction = (data: Profile) => (dispatch: AppDispatch) => {
  try {
    dispatch(setThemeAction(data.theme));
    dispatch({ type: "SET_PROFILE", data });
    dispatch(removeErrorAction("SET_PROFILE"));
  } catch (err) {
    catchErr(dispatch, err, "SET_PROFILE");
  }
};
