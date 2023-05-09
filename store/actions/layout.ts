import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { SetDeviceSizeAction } from "@interface/store/layout";

export const setDeviceSizeAction = (payload: SetDeviceSizeAction) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_DEVICE_SIZE", payload });
      await dispatch(removeErrorAction("SET_DEVICE_SIZE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DEVICE_SIZE");
    }
  };
};

export const setActiveRouteAction = (payload: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ACTIVE_ROUTE", payload });
      await dispatch(removeErrorAction("SET_ACTIVE_ROUTE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ACTIVE_ROUTE");
    }
  };
};
