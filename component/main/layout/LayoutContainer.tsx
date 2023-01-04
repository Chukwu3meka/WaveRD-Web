import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, functions } from ".";
import { setDeviceSizeAction } from "@store/actions";
import createEmotionCache from "@source/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { IHandlePageLoading, IHandleProtectedRoute, ILayoutContainer } from "@interface/main/layout-interface";

const LayoutContainer = (props: ILayoutContainer) => {
  const { pageProps, Component, store, setDeviceSizeAction, emotionCache = clientSideEmotionCache } = props,
    router = useRouter(),
    [appReady, setAppReady] = useState(false),
    [authenticated, setAuthenticated] = useState(false),
    [smallScreen, setSmallScreen] = useState(true),
    [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!appReady) {
      // !!! <= don't tamper with the ordering of this code
      setAppReady(true);
      handlePageLoading({ url: null, loading: false });

      window.addEventListener("resize", handleResize);
      handleResize(); // <= run handleResize on page load.
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (appReady && authenticated !== props.authStatus) {
      setAuthenticated(props.authStatus);
      handleProtectedRoute({ route: location.pathname, authenticated: props.authStatus });
    }
  }, [props.authStatus]);

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
    if (appReady) handleProtectedRoute({ route: router.asPath, authenticated: authenticated });
  }, [router.asPath]);

  const handleResize = () => functions.handleResize({ setDeviceSizeAction });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => functions.handlePageLoading({ url, loading, setPageLoading });
  const handleProtectedRoute = ({ route, authenticated }: IHandleProtectedRoute) => functions.handleProtectedRoute({ route, authenticated });

  return <Layout {...{ emotionCache, pageProps, Component, store, pageLoading, appReady, authenticated, smallScreen }} />;
};

const mapStateToProps = (state: any) => ({ authStatus: state.auth.status }),
  mapDispatchToProps = { setDeviceSizeAction };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
