import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, handlers } from ".";
import createEmotionCache from "@source/createEmotionCache";

const clientSideEmotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

import { IHandlePageLoading, IHandleProtectedRoute, LayoutContainer } from "@interface/main/layout-interface";

import { connector, ConnectorProps } from "@store";
import { BuilderCookieNotice } from "@component/builder/cookieNotice";
import { AppProps } from "next/app";

export default connector((props: LayoutContainer & ConnectorProps) => {
  const router = useRouter(),
    [ready, setReady] = useState(false),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [cookieNotice, setCookieNotice] = useState<boolean>(false),
    { pageProps, Component, setDeviceSizeAction, getCookieAction, emotionCache = clientSideEmotionCache } = props;

  const [layoutProps, setLayoutProps] = useState<{
    pageLoading: boolean;
    authenticated: boolean;
    displayHeader: boolean; // <= header is false on initial load
    cssVariable: React.CSSProperties;
    Component: AppProps["Component"];
    pageProps: AppProps["pageProps"];
    emotionCache;
    layout: "default" | "info" | "accounts";
  }>({
    emotionCache,
    layout: "default",
    cssVariable: {},
    pageLoading: true,
    authenticated: false,
    displayHeader: false, // <= header is false on initial load
    Component: Component,
    pageProps: pageProps,
  });

  useEffect(() => {
    // <= will run only once
    if (!ready) {
      setLayoutProps((values) => ({
        ...values,
        // iPhone not returning the right screen height in VH
        cssVariable: { ...values.cssVariable, "--visibleScreen": `${window.innerHeight + 0}px` },
      }));

      setReady(true);
      handlePageLoading({ url: null, loading: false });
      handleResize();
      getCookieAction({ setCookieNotice });
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (!ready) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const authenticated = props.auth || false;
    if (ready) {
      handleProtectedRoute();
      setLayoutProps((values) => ({ ...values, authenticated: !!authenticated }));
    }
  }, [props.auth]);

  useEffect(() => {
    router.events.on("routeChangeStart", (url: string) => handlePageLoading({ url, loading: true }));
    router.events.on("routeChangeComplete", () => handlePageLoading({ url: null, loading: false }));
    router.events.on("routeChangeError", () => handlePageLoading({ url: null, loading: false }));
    return () => {
      router.events.off("routeChangeStart", (url: string) => handlePageLoading({ url, loading: true }));
      router.events.off("routeChangeComplete", () => handlePageLoading({ url: null, loading: false }));
      router.events.off("routeChangeError", () => handlePageLoading({ url: null, loading: false }));
    };
  }, [router]);

  useEffect(() => {
    if (ready) handleProtectedRoute();
    // if (ready) handleProtectedRoute({ router, authenticated: !!authenticated });
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleResize = () => setDeviceSizeAction({ deviceWidth: window.innerWidth, deviceHeight: window.innerHeight });
  const handleScroll = () => handlers.handleScroll({ window, lastScrollPos, setLayoutProps, setLastScrollPos });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => handlers.handlePageLoading({ url, loading, setLayoutProps });
  // const handleProtectedRoute = ({ router, authenticated }: IHandleProtectedRoute) => handlers.handleProtectedRoute({ router, authenticated });
  const handleProtectedRoute = () => handlers.handleProtectedRoute({ router, authenticated: !!layoutProps.authenticated });

  return ready ? <Layout {...layoutProps} /> : <p> </p>;
});
