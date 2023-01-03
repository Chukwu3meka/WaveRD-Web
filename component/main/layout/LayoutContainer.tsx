import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout } from ".";
import { setDeviceSizeAction } from "@store/actions";

const LayoutContainer = (props: any) => {
  const { pageProps, Component, store, setDeviceSizeAction } = props,
    router = useRouter(),
    [auth, setAuth] = useState(false),
    [appReady, setAppReady] = useState(false),
    [smallScreen, setSmallScreen] = useState(true),
    [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!appReady) {
      // !!! <= don't tamper with the ordering of this code
      setAppReady(true);
      setTimeout(() => setPageLoading(false), 3000);

      window.addEventListener("resize", handleResize);
      handleResize();
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (appReady) setAuth(props.authStatus);
  }, [props.authStatus]);

  useEffect(() => {
    const handleStart = (url: string) => {
      setPageLoading(true);
      //
    };

    const handleStop = () => {
      setTimeout(() => setPageLoading(false), 2000);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const handleResize = () => {
    const width = window.innerWidth,
      height = window.innerHeight;
    setDeviceSizeAction({ width, height });
    setSmallScreen(width < 900 || height < 600);
  };

  return <Layout {...{ pageProps, Component, store, pageLoading, appReady, auth, smallScreen }} />;
};

const mapStateToProps = (state: any) => ({
    authStatus: state.auth.status,
  }),
  mapDispatchToProps = { setDeviceSizeAction };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
