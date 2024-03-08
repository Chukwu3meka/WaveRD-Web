import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import { Layout } from ".";
import theme from "@source/theme";
// import * as gtag from "@source/gtag";
import Spinner from "@component/others/Spinner";
import { persistUserAction, setDeviceWidthAction } from "@store/actions";

const LayoutContainer = (props) => {
  const { pageProps, Component, persistUserAction, store, setDeviceWidthAction, emotionCache } = props,
    router = useRouter(),
    maintainance = false,
    scrollRef = useRef(null),
    [path, setPath] = useState(null),
    [ready, setReady] = useState(0),
    [auth, setAuth] = useState(props.auth),
    [pageReady, setPageReady] = useState(true),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [displayHeader, setDisplayHeader] = useState(true);

  useEffect(() => {
    setReady(true);
    persistUserAction();
    setDeviceWidthAction(window.innerWidth);
  }, []);

  useEffect(() => {
    if (ready) {
      const url = window.location.pathname;
      setAuth(props.auth);
      if (props.auth?.club) {
        if (["/auth/signup", "/auth/reset", "/auth/verify", "/auth/signin"].includes(url?.split("?")[0])) {
          setPath(false);
          Router.push("/home");
        } else {
          setPath(url);
        }
      } else {
        if (
          ![
            "/auth/signup",
            "/auth/reset",
            "/auth/verify",
            "/auth/signin",
            "/info/privacy",
            "/info/contact",
            "/info/terms",
            "/info/advertise",
            "/info/donate",
            "/",
          ].includes(url?.split("?")[0])
        ) {
          setPath(false);
          Router.push("/");
        } else {
          setPath(url);
        }
      }
    }
  }, [props.auth]);

  useEffect(() => {
    if (ready) {
      router.events.on("routeChangeError", (url) => pageReadyHandler(false, url, `routeChange  error`));
      router.events.on("routeChangeStart", (url) => pageReadyHandler(false, url, `routeChange  start`));
      router.events.on("routeChangeComplete", (url) => pageReadyHandler(true, url, `routeChange complete`));

      return () => {
        router.events.off("routeChangeError", (url) => pageReadyHandler(false, url, `routeChange error`));
        router.events.off("routeChangeStart", (url) => pageReadyHandler(false, url, `routeChange start`));
        router.events.off("routeChangeComplete", (url) => pageReadyHandler(true, url, `routeChange complete`));
      };
    }
  }, [router.events]);

  useEffect(() => {
    validateRoute(router.route);
  }, [router.route]);

  useEffect(() => {
    if (
      ready &&
      props.error &&
      ["SUSPICIOUS_TOKEN", "SET_MANAGER"].includes(props.error[0]) &&
      window.location.pathname?.split("?")[0] !== "/auth/signin"
    ) {
      setPath(false);
      Router.push("/auth/signin");
    }
  }, [props.error]);

  const pageReadyHandler = async (pageReady, url, rc) => {
    // console.log(`Page Ready: ${pageReady}, ${url} for  ${rc}`);

    validateRoute(url);
    // console.log(pageReady);
    if (pageReady && url) {
      // gtag.pageview(url);
      setDisplayHeader(true);
      setPageReady(pageReady);
      // scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const validateRoute = (url) => {
    if (ready && url) {
      if (url?.split("?")[0].includes("/info")) {
        setPath(url);
        scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      } else if (auth?.club) {
        if (["/auth/signup", "/auth/reset", "/auth/verify", "/auth/signin"].includes(url?.split("?")[0])) {
          Router.push("/home");
          setPath(false);
        } else {
          setPath(url);
          scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      } else {
        if (!["/auth/signup", "/auth/reset", "/auth/verify", "/auth/signin", "/"].includes(url?.split("?")[0])) {
          Router.push("/");
          setPath(false);
        } else {
          setPath(url);
          scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      }
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop > lastScrollPos) {
      setDisplayHeader(false);
    } else {
      setDisplayHeader(true);
    }
    setLastScrollPos(e.target.scrollTop);
  };

  return path ? (
    <Layout
      {...{
        auth,
        path,
        theme,
        store,
        pageReady,
        Component,
        pageProps,
        scrollRef,
        emotionCache,
        handleScroll,
        maintainance,
        displayHeader,
      }}
    />
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
    auth: state.profile.auth,
    error: state.error,
  }),
  mapDispatchToProps = {
    persistUserAction,
    setDeviceWidthAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
