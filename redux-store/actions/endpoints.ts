import { removeErrorAction, catchErr } from "./error";

import { AppDispatch } from "interfaces/redux-store/store.interface";

export const setEndpointsParamAction = (data: any) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "SET_ENDPOINTS_PARAM", data });
      dispatch(removeErrorAction("SET_ENDPOINTS_PARAM"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_ENDPOINTS_PARAM");
    }
  };
};
