import { Dispatch } from "redux";
import { removeErrorAction, catchErr } from "./error";

export const setAuthAction = (payload: object) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "SET_AUTH", payload: { status: true, ...payload } });
      await dispatch(removeErrorAction("SET_1AUTH"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_AUTH");
    }
  };
};

export const logoutAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "SET_AUTH", payload: { status: false } });
      await dispatch(removeErrorAction("SET_AUTH"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_AUTH");
    }
  };
};
