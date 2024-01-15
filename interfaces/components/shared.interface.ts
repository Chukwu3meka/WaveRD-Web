import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EnqueueSnackbar } from "notistack";
import { EmotionCache } from "@emotion/react";
import { LayoutContext, Theme } from "interfaces/store/layout.interfaces";
import { UserContext } from "interfaces/store/user.interfaces";

// ? Interfaces
export interface LayoutContainer {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  emotionCache?: EmotionCache;
  theme: Theme;
  route: string;
  auth: UserContext;
  // loading: boolean;

  setDeviceSizeAction: Function;
  setActiveRouteAction: Function;
  setDisplayHeaderAction: Function;
  setThemeAction: Function;
  setAuthAction: Function;
}

export interface LayoutProps {
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
  // setLoading?: Function;
  status: "error" | "complete" | "start";
}

export interface RoutesHandler {
  router: NextRouter;
  authenticated: boolean;
  setRoute: Function;
  // setActiveRouteAction;
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

export interface Header {
  position: "relative" | "sticky";
  authenticated: boolean;
  displayHeader: boolean;
  swapColorFn: Function;
  color: ColorState;
  theme: Theme;
  themeHandler: Function;
  visible: VisibleState;
}

export interface HeaderContainer {
  auth: UserContext;
  setThemeAction: Function;
  width: number;
  theme: Theme;
  header: boolean;
  position: "relative" | "sticky";
}

export interface ColorState {
  first: "textSecondary" | "primary";
  last: "primary" | "textSecondary";
}

export interface VisibleState {
  nav: boolean;
  mobile: boolean;
}

export interface ReactChildren {
  children: React.ReactNode;
}
