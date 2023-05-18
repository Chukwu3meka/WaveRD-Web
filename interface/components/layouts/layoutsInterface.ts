import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EmotionCache } from "@emotion/react";
import { EnqueueSnackbar } from "notistack";
import { store } from "@store";

export interface LayoutContainer {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  emotionCache?: EmotionCache;
}

export interface Layout {
  loading: boolean;
  theme: "dark" | "light";
  Component: AppProps["Component"];
  route: string;
  pageProps: AppProps["pageProps"];
  ready: boolean;
  emotionCache: EmotionCache;
}

export interface HandlePageLoading {
  url: string;
  loading: boolean;
  setLoading?: Function;
}

export interface HandleProtectedRoute {
  router: NextRouter;
  authenticated: boolean;
  setRoute: Function;
  setActiveRouteAction;
  enqueueSnackbar: EnqueueSnackbar;
  closeSnackbar: Function;
}

export interface HandleScroll {
  setDisplayHeaderAction: Function;
}

export interface SubLayout {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
  loading: boolean;
}

export interface InfoLayout extends SubLayout {
  activeRoute: string;
}
