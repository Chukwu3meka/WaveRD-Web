import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EnqueueSnackbar } from "notistack";
import { EmotionCache } from "@emotion/react";

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

export interface RoutesHandler {
  router: NextRouter;
  authenticated: boolean;
  setRoute: Function;
  setActiveRouteAction;
  enqueueSnackbar: EnqueueSnackbar;
}

export interface HandleScroll {
  prevScrollPos: number;
  setPrevScrollPos: Function;
  setDisplayHeaderAction: Function;
}

export interface SubLayout {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
  loading: boolean;
}

export interface InfoLayout extends SubLayout {
  activeRoute: string;
  deviceWidth: number;
  autoCompleteHandler: Function;
}
export interface NavLinks {
  label: string;
  path: string;
}
