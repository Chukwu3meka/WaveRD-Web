import { removeErrorAction, catchErr } from "./error";

import { AppDispatch } from "interfaces/redux-store/store.interface";

export const setEndpointsAction = (data: any) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ENDPOINTS", data });
      dispatch(removeErrorAction("SET_ENDPOINTS"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ENDPOINTS");
    }
  };
};
