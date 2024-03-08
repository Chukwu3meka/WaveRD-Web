import { removeErrorAction, catchErr } from "./error";

import { Theme } from "interfaces/components/layouts.interface";
import { AppDispatch } from "interfaces/redux-store/store.interface";
import { DeviceSize } from "interfaces/redux-store/layout.interfaces";

export const setDeviceSizeAction = (data: DeviceSize) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_DEVICE_SIZE", data });
      await dispatch(removeErrorAction("SET_DEVICE_SIZE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DEVICE_SIZE");
    }
  };
};

export const setActiveRouteAction = (data: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ACTIVE_ROUTE", data });
      await dispatch(removeErrorAction("SET_ACTIVE_ROUTE"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ACTIVE_ROUTE");
    }
  };
};

export const setDisplayHeaderAction = (data: boolean) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_DISPLAY_HEADER", data });
      // const scrollTop: number = window.scrollY,
      //   lastScrollTop: number = +sessionStorage.getItem("lastScrollTop") || 0;

      // if (window.scrollY > lastScrollTop || window.scrollY <= 50) {
      //   dispatch({ type: "SET_DISPLAY_HEADER", data: false });
      // } else {
      //   dispatch({ type: "SET_DISPLAY_HEADER", data: true });
      // }

      // sessionStorage.setItem("lastScrollTop", scrollTop.toString());

      dispatch(removeErrorAction("SET_DISPLAY_HEADER"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DISPLAY_HEADER");
    }
  };
};
