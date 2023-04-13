import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";
import { NextRouter } from "next/router";

// export interface ILayoutContainer extends AppProps {
//   store: any;
//   authStatus: boolean;
//   emotionCache?: EmotionCache;
//   setDeviceSizeAction: Function;
// }
export interface ILayoutContainer {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  store: any;
  emotionCache?: EmotionCache;
  setDeviceSizeAction?: Function;
  authStatus?: boolean;
}

export interface ILayout {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  store: any;
  displayHeader: boolean;
  pageLoading: boolean;
  appReady: boolean;
  emotionCache: EmotionCache;
  cssVariable: React.CSSProperties;
  cookieNotice: boolean;
}

export interface IFunctionsHandleResize {
  setDeviceSizeAction: Function;
}
export interface IHandleScroll {
  window: Window;
  lastScrollPos: number;
  setDisplayHeader: Function;
  setLastScrollPos: Function;
}

export interface IHandlePageLoading {
  url: null | string;
  loading: boolean;
}

export interface IFunctionsHandlePageLoading extends IHandlePageLoading {
  setPageLoading: Function;
}

export interface IHandleProtectedRoute {
  router: NextRouter;
  authenticated: boolean;
}
