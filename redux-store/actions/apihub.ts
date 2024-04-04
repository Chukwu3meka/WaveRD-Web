import { removeErrorAction, catchErr } from "./error";

import { AppDispatch } from "interfaces/redux-store/store.interface";
import { DeviceSize } from "interfaces/redux-store/layout.interfaces";

export const setEndpointsAction = async (data: any) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ENDPOINTS", data });
      dispatch(removeErrorAction("SET_ENDPOINTS"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ENDPOINTS");
    }
  };
};

export const clearEndpointsAction = () => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "CLEAR_ENDPOINTS" });
      dispatch(removeErrorAction("CLEAR_ENDPOINTS"));
    } catch (err) {
      return catchErr(dispatch, err, "CLEAR_ENDPOINTS");
    }
  };
};
