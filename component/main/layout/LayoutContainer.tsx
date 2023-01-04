import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, functions } from ".";
import { setDeviceSizeAction } from "@store/actions";

import { CacheProvider, EmotionCache } from "@emotion/react";

import createEmotionCache from "@source/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { AppProps } from "next/app";
import { IHandlePageLoading } from "@interface/main/layout-interface";

interface LayoutContainerProps extends AppProps {
  store: any;
  emotionCache?: EmotionCache;
  setDeviceSizeAction: Function;
  authStatus: boolean;
}

const LayoutContainer = (props: LayoutContainerProps) => {
  const { pageProps, Component, store, setDeviceSizeAction, emotionCache = clientSideEmotionCache } = props,
    router = useRouter(),
    [auth, setAuth] = useState(false),
    [appReady, setAppReady] = useState(false),
    [smallScreen, setSmallScreen] = useState(true),
    [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!appReady) {
      // !!! <= don't tamper with the ordering of this code
      setAppReady(true);
      handlePageLoading({ url: null, loading: false });

      window.addEventListener("resize", handleResize);
      handleResize(); // <= run handleResize on page load
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (appReady) setAuth(props.authStatus);
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

  // useEffect(() => {
  //   console.log('useEffect fired!', {asPath: router.asPath});
  // }, [router.asPath]);

  const handleResize = () => functions.handleResize({ setDeviceSizeAction, setSmallScreen });
  const handlePageLoading = ({ url, loading }: IHandlePageLoading) => functions.handlePageLoading({ url, loading, setPageLoading });

  return <Layout {...{ emotionCache, pageProps, Component, store, pageLoading, appReady, auth, smallScreen }} />;
};

const mapStateToProps = (state: any) => ({
    authStatus: state.auth.status,
  }),
  mapDispatchToProps = { setDeviceSizeAction };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
