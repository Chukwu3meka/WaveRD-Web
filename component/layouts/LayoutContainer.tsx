import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, handlers } from ".";
import createEmotionCache from "@source/createEmotionCache";

const clientSideEmotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

import { IHandlePageLoading, IHandleProtectedRoute, LayoutContainer } from "@interface/main/layout-interface";

import { connector, ConnectorProps } from "@store";
import { BuilderCookieNotice } from "@component/shared/cookieNotice";
import { AppProps } from "next/app";
import { SetThemeAction } from "@interface/store/layout";

export default connector((props: LayoutContainer & ConnectorProps) => {
  const router = useRouter(),
    [ready, setReady] = useState(false),
    [theme, setTheme] = useState(null),
    [loading, setLoading] = useState(true),
    [layout, setLayout] = useState(null),
    [authenticated, setAuthenticated] = useState(false),
    [cookieNotice, setCookieNotice] = useState<boolean>(false),
    { pageProps, Component, setDeviceSizeAction, verifyCookieAction, emotionCache = clientSideEmotionCache, setDisplayHeaderAction } = props;

  useEffect(() => {
    if (!ready) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", setDisplayHeaderAction);
      verifyCookieAction({ setCookieNotice, setTheme, setReady, handlePageLoading });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", setDisplayHeaderAction);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setAuthenticated(!!props.auth || false);
      handleProtectedRoute();
    }
  }, [props.auth]);

  useEffect(() => {
    if (ready) setTheme(props.layout.theme);
  }, [props.layout.theme]);

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
  }, [router.asPath]);

  const handleProtectedRoute = () => handlers.handleProtectedRoute({ router, authenticated, setLayout });
  const handleResize = () => setDeviceSizeAction({ deviceWidth: window.innerWidth, deviceHeight: window.innerHeight });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => handlers.handlePageLoading({ url, loading, setLoading });

  return (
    <Layout
      ready={ready}
      theme={theme}
      layout={layout}
      loading={loading}
      Component={Component}
      pageProps={pageProps}
      emotionCache={emotionCache}
      authenticated={authenticated}
    />
  );
});
