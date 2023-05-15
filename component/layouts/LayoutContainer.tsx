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
    [route, setRoute] = useState(null),
    [authenticated, setAuthenticated] = useState(false),
    {
      pageProps,
      Component,
      setDeviceSizeAction,
      verifyCookieAction,
      setActiveRouteAction,
      emotionCache = clientSideEmotionCache,
      setDisplayHeaderAction,
    } = props;

  useEffect(() => {
    if (!ready) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", setDisplayHeaderAction);
      verifyCookieAction({ setRoute, setTheme, setReady, handlePageLoading });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", setDisplayHeaderAction);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setAuthenticated(!!props.auth);
      handleProtectedRoute(!!props.auth);
    }
  }, [props.auth]);

  useEffect(() => {
    if (ready) setTheme(props.layout.theme);
  }, [props.layout.theme]);

  useEffect(() => {
    if (ready) setRoute(props.layout.route);
  }, [props.layout.route]);

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

  const handleProtectedRoute = (auth?: boolean) => handlers.handleProtectedRoute({ router, authenticated: auth || authenticated, setRoute });
  const handleResize = () => setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => handlers.handlePageLoading({ url, loading, setLoading });

  return (
    <Layout
      ready={ready}
      theme={theme}
      route={route}
      loading={loading}
      Component={Component}
      pageProps={pageProps}
      emotionCache={emotionCache}
      authenticated={authenticated}
    />
  );
});
