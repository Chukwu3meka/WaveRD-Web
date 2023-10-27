import fetcher from "@utils/fetcher";
import { AppDispatch } from "@store";
import { removeErrorAction, catchErr } from "./error";

import { SetAuthAction } from "@interface/store/auth";
import { setCssThemeVar } from "@utils/handlers";
import { setActiveRouteAction, setDeviceSizeAction, setThemeAction } from "./layout";
import { protectedRoutes } from "@utils/constants/routes";

export const setAuthAction = (data: SetAuthAction) => (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "SET_AUTH", data });
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

export const verifyCookieAction = (data: any) => async (dispatch: AppDispatch) => {
  // document.documentElement.style.setProperty("--headerHeight", "70px");
  // // ? iPhone not returning the right screen height in VH
  // document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`);
  // try {
  //   const route = location.pathname,
  //     { setRoute, setTheme, setReady, handlePageLoading, router, enqueueSnackbar, setAuthenticated } = data;
  //   const setThemeFn = (theme) => {
  //     setTheme(theme);
  //     setCssThemeVar(theme);
  //     dispatch(setThemeAction(theme));
  //   };
  //   await fetcher({ method: "GET", endpoint: "/accounts/details" })
  //     .then(async ({ data }) => {
  //       setAuthenticated(true);
  //       setThemeFn(data.theme);
  //       dispatch(setAuthAction(data));
  //     })
  //     .catch(() => {
  //       setAuthenticated(false);
  //       const darkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  //       setThemeFn(darkTheme ? "dark" : "light");
  //       if (protectedRoutes.includes(route)) {
  //         enqueueSnackbar("Kindly signin to access this route", {
  //           variant: "error",
  //           onEntered: () => router.push(`/accounts/signin?redirect=${route}`),
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       dispatch(setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight }));
  //       dispatch(setActiveRouteAction(location.pathname));
  //       handlePageLoading({ url: null, loading: false });
  //       setRoute(location.pathname);
  //       setReady(true);
  //     });
  // } catch (err) {}
};
