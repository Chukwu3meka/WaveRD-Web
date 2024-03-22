import { removeErrorAction, catchErr } from "./error";

import { AppDispatch } from "interfaces/redux-store/store.interface";
import { DeviceSize } from "interfaces/redux-store/layout.interfaces";

export const setDeviceSizeAction = (data: DeviceSize) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_DEVICE_SIZE", data });
      dispatch(removeErrorAction("SET_DEVICE_SIZE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DEVICE_SIZE");
    }
  };
};

export const setActiveRouteAction = (data: string) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ACTIVE_ROUTE", data });
      dispatch(removeErrorAction("SET_ACTIVE_ROUTE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ACTIVE_ROUTE");
    }
  };
};

export const setDisplayHeaderAction = (data: boolean) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_DISPLAY_HEADER", data });
      dispatch(removeErrorAction("SET_DISPLAY_HEADER"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DISPLAY_HEADER");
    }
  };
};
