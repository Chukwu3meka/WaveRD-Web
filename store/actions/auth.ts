import fetcher from "@utils/fetcher";
import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { GetCookieAction, SetAuthAction } from "@interface/store/auth";
import { setCssThemeVar } from "@utils/handlers";
import { setDeviceSizeAction, setThemeAction } from "./layout";

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

export const verifyCookieAction = (payload: any) => async (dispatch: AppDispatch) => {
  document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight + 0}px`); // <= iPhone not returning the right screen height in VH

  try {
    const { setTheme, setReady, handlePageLoading } = payload;

    const setThemeFn = (theme) => {
      setTheme(theme);
      setCssThemeVar(theme);
      dispatch(setThemeAction(theme));
    };

    await fetcher({ method: "GET", endpoint: "/accounts/cookies" })
      .then(async ({ payload }) => {
        setThemeFn(payload.theme);
        dispatch(setAuthAction(payload));
      })
      .catch(() => {
        setThemeFn(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      })
      .finally(() => {
        dispatch(setDeviceSizeAction({ deviceWidth: window.innerWidth, deviceHeight: window.innerHeight }));
        handlePageLoading({ url: null, loading: false });
        setReady(true);
      });
  } catch (err) {}
};
