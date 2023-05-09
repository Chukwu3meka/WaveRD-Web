import fetcher from "@utils/fetcher";
import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { GetCookieAction, SetAuthAction } from "@interface/store/auth";

export const setAuthAction = (payload: SetAuthAction) => (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "SET_AUTH", payload });
    dispatch(removeErrorAction("SET_AUTH"));
  } catch (err) {
    catchErr(dispatch, err, "SET_AUTH");
  }
};

export const signoutAction = () => async (dispatch: AppDispatch) => {
  try {
    await fetcher({ method: "GET", endpoint: "/accounts/signout" });
  } catch (err) {
    catchErr(dispatch, err, "SIGNOUT");
  }
};

export const getCookieAction = (payload: GetCookieAction) => async (dispatch: AppDispatch) => {
  try {
    const { setCookieNotice } = payload;
    await fetcher({ method: "GET", endpoint: "/accounts/cookies" }).then(async ({ payload }) => {
      dispatch(setAuthAction(payload));
      setCookieNotice(!payload.cookieConsent);
    });
  } catch (err) {}
};
