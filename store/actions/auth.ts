import fetcher from "@utils/fetcher";
import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { SetAuthAction } from "@interface/store/auth";
import { setCssThemeVar } from "@utils/handlers";
import { setActiveRouteAction, setDeviceSizeAction, setThemeAction } from "./layout";
import { accountsRoute, protectedRoutes } from "@utils/constants/routes";

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
  document.documentElement.style.setProperty("--headerHeight", "66.24px");
  document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`); // <= iPhone not returning the right screen height in VH

  try {
    const { setTheme, setReady, handlePageLoading, setRoute, router, enqueueSnackbar } = payload;

    const setThemeFn = (theme) => {
      setTheme(theme);
      setCssThemeVar(theme);
      dispatch(setThemeAction(theme));
    };

    //localhost:3000/accounts/signin#_=_
    http: await fetcher({ method: "GET", endpoint: "/accounts/details" })
      .then(async ({ payload }) => {
        setThemeFn(payload.theme);
        dispatch(setAuthAction(payload));
        for (const route of accountsRoute) if (location.pathname.startsWith(route)) router.push("/"); // Signout to access this page
      })
      .catch(() => {
        setThemeFn(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        for (const route of protectedRoutes) if (location.pathname.startsWith(route)) router.push("/accounts/signin"); // Signin to access this page
      })
      .finally(() => {
        dispatch(setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight }));
        dispatch(setActiveRouteAction(location.pathname));
        handlePageLoading({ url: null, loading: false });
        setRoute(location.pathname);
        setReady(true);
      });
  } catch (err) {}
};
