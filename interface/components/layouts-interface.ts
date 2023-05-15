import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EmotionCache } from "@emotion/react";

export interface LayoutContainer {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  emotionCache?: EmotionCache;
}

export interface Layout {
  route: string;
  ready: boolean;
  loading: boolean;
  authenticated: boolean;
  theme: "dark" | "light";
  emotionCache: EmotionCache;
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
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
}

export interface HandleScroll {
  setDisplayHeaderAction: Function;
}

export interface SubLayout {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
  loading: boolean;
}
