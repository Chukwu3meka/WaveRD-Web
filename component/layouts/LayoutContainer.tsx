import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, handlers } from ".";
import { connector, ConnectorProps } from "@store";
import createEmotionCache from "@styles/createEmotionCache";

import { HandlePageLoading, LayoutContainer } from "@interface/components/layouts/layoutsInterface";

const clientSideEmotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

export default connector((props: LayoutContainer & ConnectorProps) => {
  const router = useRouter(),
    [theme, setTheme] = useState(null),
    [route, setRoute] = useState(null),
    [ready, setReady] = useState(false),
    { enqueueSnackbar } = useSnackbar(),
    emotionCache = clientSideEmotionCache,
    [loading, setLoading] = useState(true),
    [prevScrollPos, setPrevScrollPos] = useState(0),
    [authenticated, setAuthenticated] = useState(false),
    { pageProps, Component, setDeviceSizeAction, verifyCookieAction, setActiveRouteAction, setDisplayHeaderAction } = props;

  useEffect(() => {
    if (!ready) {
      window.addEventListener("resize", handleResize);
      verifyCookieAction({ setRoute, setTheme, setReady, handlePageLoading, router, enqueueSnackbar });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (ready) {
      setAuthenticated(!!props.auth);
      routesHandler(!!props.auth);
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
    if (ready) routesHandler(!!props.auth || authenticated);
  }, [router.asPath]);

  const handleResize = () => setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight }),
    handlePageLoading = ({ url, loading }: HandlePageLoading) => handlers.handlePageLoading({ url, loading, setLoading }),
    handleScroll = () => handlers.handleScroll({ prevScrollPos, setPrevScrollPos, setDisplayHeaderAction }),
    routesHandler = (auth?: boolean) =>
      handlers.routesHandler({ router, authenticated: auth || authenticated, setRoute, setActiveRouteAction, enqueueSnackbar });

  return <Layout ready={ready} theme={theme} route={route} loading={loading} Component={Component} pageProps={pageProps} emotionCache={emotionCache} />;
});
