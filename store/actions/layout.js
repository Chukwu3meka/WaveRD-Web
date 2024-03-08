import { removeErrorAction, catchErr } from "./error";

export const setAuthSlideTextAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_SLIDE_TEXT", payload });
      await dispatch(removeErrorAction("SLIDE_TEXT"));
    } catch (err) {
      return catchErr(dispatch, err, "SLIDE_TEXT");
    }
  };
};

export const setDeviceWidthAction = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_DEVICE_WIDTH", payload });
      await dispatch(removeErrorAction("SET_DEVICE_WIDTH"));
    } catch (err) {
      return catchErr(dispatch, err, "SET_DEVICE_WIDTH");
    }
  };
};
