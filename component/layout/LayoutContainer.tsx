import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, functions } from ".";
import { setAuthAction, setDeviceSizeAction } from "@store/actions";
import createEmotionCache from "libs/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { IHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

const LayoutContainer = (props: any) => {
  const router = useRouter(),
    [appReady, setAppReady] = useState(false),
    [lastScrollPos, setLastScrollPos] = useState(0),
    // [displayHeader, setDisplayHeader] = useState(true),
    [displayHeader, setDisplayHeader] = useState(false), // header is false on initial load
    [pageLoading, setPageLoading] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    { pageProps, Component, store, setDeviceSizeAction, emotionCache = clientSideEmotionCache, setAuthAction } = props;

  useEffect(() => {
    if (!appReady) {
      setAppReady(true);
      handlePageLoading({ url: null, loading: false });
      window.addEventListener("resize", handleResize);
      handleResize(); // <= run handleResize on page load.
    }
    return () => {
      if (!appReady) retrieveCookie(); // <= will run only once
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const authenticated = props.authStatus || false;

    if (appReady) {
      setAuthenticated(authenticated);
      handleProtectedRoute({ router, authenticated });
    }
    // // if (appReady) retrieveCookie(); // <= will run only once
    // if (appReady && authenticated !== props.authStatus) {
    //   setAuthenticated(authenticated);
    //   handleProtectedRoute({ router, authenticated });
    // }
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
    if (appReady) handleProtectedRoute({ router, authenticated });
  }, [router.asPath]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const retrieveCookie = () => functions.retrieveCookie({ setAuthAction });
  const handleResize = () => functions.handleResize({ setDeviceSizeAction: setDeviceSizeAction! });
  const handleScroll = () => functions.handleScroll({ window, lastScrollPos, setDisplayHeader, setLastScrollPos });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => functions.handlePageLoading({ url, loading, setPageLoading });
  const handleProtectedRoute = ({ router, authenticated }: IHandleProtectedRoute) => functions.handleProtectedRoute({ router, authenticated });

  return <Layout {...{ pageProps, Component, store, pageLoading, appReady, emotionCache, displayHeader }} />;
};

const mapStateToProps = (state: any) => ({ authStatus: state.auth.status }),
  mapDispatchToProps = { setDeviceSizeAction, setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
