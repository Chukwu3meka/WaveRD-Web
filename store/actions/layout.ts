import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { SetDeviceSizeAction } from "@interface/store/layout";
import { Theme } from "@interface/utils/constantsInterface";

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

export const setThemeAction = (payload: Theme) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_THEME", payload });
      await dispatch(removeErrorAction("SET_THEME"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_THEME");
    }
  };
};

export const setDisplayHeaderAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const scrollTop: number = window.scrollY,
        lastScrollTop: number = +sessionStorage.getItem("lastScrollTop") || 0;

      if (window.scrollY > lastScrollTop || window.scrollY <= 50) {
        dispatch({ type: "SET_DISPLAY_HEADER", payload: false });
      } else {
        dispatch({ type: "SET_DISPLAY_HEADER", payload: true });
      }

      sessionStorage.setItem("lastScrollTop", scrollTop.toString());

      dispatch(removeErrorAction("SET_DISPLAY_HEADER"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DISPLAY_HEADER");
    }
  };
};
