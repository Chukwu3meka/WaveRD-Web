import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EmotionCache } from "@emotion/react";

import { AuthState } from "@interface/store/auth";

// export interface ILayoutContainer extends AppProps {
//   store: any;
//   authStatus: boolean;
//   emotionCache?: EmotionCache;
//   setDeviceSizeAction: Function;
// }
// export interface LayoutContainer {
//   pageProps: AppProps["pageProps"];
//   Component: AppProps["Component"];
//   emotionCache?: EmotionCache;
//   // setDeviceSizeAction?: Function;
//   // auth: AuthState | null;
// }

export interface ILayout {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  displayHeader: boolean;
  pageLoading: boolean;
  appReady: boolean;
  authenticated;
  emotionCache: EmotionCache;
  cssVariable: React.CSSProperties;
  cookieNotice: boolean;
}

export interface IHandleScroll {
  window: Window;
  lastScrollPos: number;
  setDisplayHeader: Function;
  setLastScrollPos: Function;
}

// export interface IFunctionsHandlePageLoading extends IHandlePageLoading {
//   setPageLoading: Function;
// }

export interface IHandleProtectedRoute {
  router: NextRouter;
  authenticated: boolean;
}
