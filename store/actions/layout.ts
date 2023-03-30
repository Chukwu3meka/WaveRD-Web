import { Dispatch } from "redux";
import { removeErrorAction, catchErr } from "./error";

export const setDeviceSizeAction = (payload: number) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "SET_DEVICE_SIZE", payload });
      await dispatch(removeErrorAction("SET_DEVICE_SIZE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DEVICE_SIZE");
    }
  };
};

export const setActiveRouteAction = (payload: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: "SET_ACTIVE_ROUTE", payload });
      await dispatch(removeErrorAction("SET_ACTIVE_ROUTE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ACTIVE_ROUTE");
    }
  };
};
