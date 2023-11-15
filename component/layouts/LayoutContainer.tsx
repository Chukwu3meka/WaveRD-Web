import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout } from ".";
import fetcher from "@utils/fetcher";
import { protectedRoutes } from "@utils/constants/routes";
import createEmotionCache from "@styles/createEmotionCache";
import { getQueryParams, setCssThemeVar } from "@utils/handlers";
import { setDeviceSizeAction, setActiveRouteAction, setDisplayHeaderAction, setThemeAction, setAuthAction } from "@store-actions";

import { HandlePageLoading, LayoutContainer as ILayoutContainer } from "@interface/components/layouts/layoutsInterface";

const emotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

const LayoutContainer = (props: ILayoutContainer) => {
  let authenticated = false;

  const router = useRouter(),
    [route, setRoute] = useState(""),
    [theme, setTheme] = useState(null),
    { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(false),
    [loading, setLoading] = useState(true),
    [prevScrollPos, setPrevScrollPos] = useState(0),
    { pageProps, Component, setDeviceSizeAction, setActiveRouteAction, setDisplayHeaderAction, setThemeAction, setAuthAction } = props;

  useEffect(() => {
    const handleResize = () => setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight });

    initSoccerMASS();

    window.addEventListener("resize", handleResize);
    router.events.on("routeChangeStart", (url: string) => routeEventsHandler({ url, loading: true, status: "start" }));
    router.events.on("routeChangeError", (url: string) => routeEventsHandler({ url, loading: false, status: "error" }));
    router.events.on("routeChangeComplete", (url: string) => routeEventsHandler({ url, loading: false, status: "complete" }));

    return () => {
      window.removeEventListener("resize", handleResize);
      router.events.off("routeChangeStart", (url: string) => routeEventsHandler({ url, loading: true, status: "start" }));
      router.events.off("routeChangeError", (url: string) => routeEventsHandler({ url, loading: false, status: "error" }));
      router.events.off("routeChangeComplete", (url: string) => routeEventsHandler({ url, loading: false, status: "complete" }));
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    setTheme(props.theme);
    setCssThemeVar(props.theme);
  }, [props.theme]);

  useEffect(() => {
    if (ready) authenticated = !!props.auth;
  }, [props.auth]);

  useEffect(() => {
    setRoute(props.route);
  }, [props.route]);

  const initSoccerMASS = async () => {
    // Set relative (not sticky) header height
    document.documentElement.style.setProperty("--headerHeight", "77px");
    // --visibleScreen: to fix wrong VH in  iPhone
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`);

    const route = location.pathname,
      { innerWidth: width, innerHeight: height } = window;

    await fetcher({ method: "GET", endpoint: "/accounts/details" })
      .then(async ({ data }) => {
        setAuthAction(data);
        authenticated = !!data;
        setThemeAction(data.theme);
        setActiveRouteAction(route);

        // Redirect to specified route if URL is currently in signin and contains redirect param
        if (router.pathname === "/accounts/signin") {
          const redirectTarget = getQueryParams(router.asPath, "redirect");

          if (redirectTarget && typeof redirectTarget === "string") {
            setActiveRouteAction(redirectTarget);
            router.push(redirectTarget);
          } else {
            setActiveRouteAction(route);
          }
        } else {
          setActiveRouteAction(route);
        }
      })
      .catch(() => {
        const darkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setThemeAction(darkTheme ? "dark" : "light");

        if (protectedRoutes.includes(route)) {
          setActiveRouteAction("/accounts/signin");
          router.push(`/accounts/signin?redirect=${route}`);
          enqueueSnackbar("Kindly signin to access this route", { variant: "error" });
        } else {
          setActiveRouteAction(route);
        }
      })
      .finally(async () => {
        setReady(true);
        setLoading(false);
        setDeviceSizeAction({ width, height });
      });
  };

  const routeEventsHandler = async ({ url, status }: HandlePageLoading) => {
    if (status === "start" && !route.startsWith("/info/")) {
      const pathname = url?.split("?")[0],
        redirectTarget = getQueryParams(url, "redirect");

      if (!pathname.startsWith("/info/")) setLoading(true);

      if (!authenticated && protectedRoutes.includes(pathname)) {
        router.events.emit("routeChangeError");

        enqueueSnackbar("Kindly signin to access this route", { variant: "error" });
        router.replace(`/accounts/signin?redirect=${pathname}`);
      }

      if (authenticated && redirectTarget && pathname === "/accounts/signin") {
        router.push(redirectTarget);
      }
    }

    if (status === "complete" && !url.startsWith("/info/")) {
      setLoading(false);
      setActiveRouteAction(url);
    }
  };

  const handleScroll = () => {
    const w = window,
      yScrollPosition = w.pageYOffset,
      pageTopReached = yScrollPosition < 81,
      scrollingToPageTop = yScrollPosition < prevScrollPos,
      areaHeight = Math.round(w.innerHeight + yScrollPosition) + 2,
      pageBottomReached = areaHeight >= document.body.offsetHeight;

    if (!pageTopReached && (scrollingToPageTop || pageBottomReached)) {
      setDisplayHeaderAction(true);
    } else {
      setDisplayHeaderAction(false);
    }

    setPrevScrollPos(yScrollPosition);
  };

  return <Layout ready={ready} theme={theme} route={route} loading={loading} Component={Component} pageProps={pageProps} emotionCache={emotionCache} />;
};

const mapStateToProps = (state) => ({ theme: state.layout.theme, route: state.layout.route, auth: state.auth }),
  mapDispatchToProps = { setDeviceSizeAction, setActiveRouteAction, setDisplayHeaderAction, setThemeAction, setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
