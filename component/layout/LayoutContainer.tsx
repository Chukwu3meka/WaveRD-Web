import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, handlers } from ".";
import createEmotionCache from "@source/createEmotionCache";

const clientSideEmotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

import { IHandlePageLoading, IHandleProtectedRoute, LayoutContainer } from "@interface/main/layout-interface";

import { connector, ConnectorProps } from "@store";

export default connector((props: LayoutContainer & ConnectorProps) => {
  const router = useRouter(),
    [ready, setReady] = useState(false),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [pageLoading, setPageLoading] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    [cookieNotice, setCookieNotice] = useState<boolean>(false),
    [cssVariable, setCssVariable] = useState<React.CSSProperties>({}),
    [displayHeader, setDisplayHeader] = useState(false), // header is false on initial load
    { pageProps, Component, setDeviceSizeAction, getCookieAction, emotionCache = clientSideEmotionCache } = props;

  useEffect(() => {
    // <= will run only once
    if (!ready) {
      setCssVariable((cssVariable) => ({
        ...cssVariable,
        "--visibleScreen": `${window.innerHeight + 2}px`, // <= iPhone not returning the right screen height in VH
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
      setAuthenticated(!!authenticated);
      handleProtectedRoute({ router, authenticated: !!authenticated });
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
    if (ready) handleProtectedRoute({ router, authenticated: !!authenticated });
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleResize = () => setDeviceSizeAction({ deviceWidth: window.innerWidth, deviceHeight: window.innerHeight });
  const handleScroll = () => handlers.handleScroll({ window, lastScrollPos, setDisplayHeader, setLastScrollPos });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => handlers.handlePageLoading({ url, loading, setPageLoading });
  const handleProtectedRoute = ({ router, authenticated }: IHandleProtectedRoute) => handlers.handleProtectedRoute({ router, authenticated });

  return ready ? <Layout {...{ pageProps, Component, authenticated, pageLoading, ready, emotionCache, displayHeader, cssVariable, cookieNotice }} /> : <></>;
});
