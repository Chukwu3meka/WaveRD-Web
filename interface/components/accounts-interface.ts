import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { EmotionCache } from "@emotion/react";

export interface LayoutContainer {
  pageProps: AppProps["pageProps"];
  Component: AppProps["Component"];
  emotionCache?: EmotionCache;
}
