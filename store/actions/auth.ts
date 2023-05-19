import fetcher from "@utils/fetcher";
import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { SetAuthAction } from "@interface/store/auth";
import { setCssThemeVar } from "@utils/handlers";
import { setActiveRouteAction, setDeviceSizeAction, setThemeAction } from "./layout";
import { logoutRoutes, protectedRoutes } from "@utils/constants/routes";

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
  document.documentElement.style.setProperty("--headerHeight", "calc(66.24px) + 2px");
  document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`); // <= iPhone not returning the right screen height in VH

  try {
    const { setTheme, setReady, handlePageLoading, setRoute, router, enqueueSnackbar } = payload;

    const setThemeFn = (theme) => {
      setTheme(theme);
      setCssThemeVar(theme);
      dispatch(setThemeAction(theme));
    };

    const route = location.pathname,
      notHomePage = !!route.split("/")[1],
      darkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    console.log({ notHomePage });

    setThemeFn(darkTheme ? "dark" : "light");

    await fetcher({ method: "GET", endpoint: "/accounts/details" })
      .then(async ({ payload }) => {
        setThemeFn(payload.theme);
        dispatch(setAuthAction(payload));

        if (notHomePage)
          for (const path of logoutRoutes)
            if (route.startsWith(path))
              enqueueSnackbar("You need to sign out to access this route", {
                variant: "error",
                onEntered: () => router.push(router.query && router.query.redirect ? (router.query.redirect as string) : "/"),
              });
      })
      .catch(() => {
        if (notHomePage)
          for (const path of protectedRoutes)
            if (route.startsWith(path))
              enqueueSnackbar("You need to be authenticated to access this route", {
                variant: "error",
                onEntered: () => router.push(`/accounts/signin?redirect=${route}`),
              });
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
