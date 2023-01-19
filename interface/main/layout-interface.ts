import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";

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
  handleScroll: Function;
  displayHeader: boolean;
  pageLoading: boolean;
  appReady: boolean;
  emotionCache: EmotionCache;
}

export interface IFunctionsHandleResize {
  setDeviceSizeAction: Function;
}

export interface IHandlePageLoading {
  url: null | string;
  loading: boolean;
}

export interface IFunctionsHandlePageLoading extends IHandlePageLoading {
  setPageLoading: Function;
}

export interface IHandleProtectedRoute {
  route: string;
  authenticated: boolean;
}
