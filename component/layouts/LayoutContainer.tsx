import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Layout, handlers } from ".";
import { connector, ConnectorProps } from "@store";
import createEmotionCache from "@source/createEmotionCache";

import { HandlePageLoading, LayoutContainer } from "@interface/components/layouts/layoutsInterface";

const clientSideEmotionCache = createEmotionCache(); // <= Client-side cache, shared for the whole session of the user in the browser.

export default connector((props: LayoutContainer & ConnectorProps) => {
  const router = useRouter(),
    [theme, setTheme] = useState(null),
    [route, setRoute] = useState(null),
    [ready, setReady] = useState(false),
    [loading, setLoading] = useState(true),
    { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    [authenticated, setAuthenticated] = useState(false),
    {
      pageProps,
      Component,
      setDeviceSizeAction,
      verifyCookieAction,
      setActiveRouteAction,
      setDisplayHeaderAction,
      emotionCache = clientSideEmotionCache,
    } = props;

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    // const handleScroll = () => {
    //   const currentScrollPos = window.pageYOffset;

    //   // Check if user has scrolled to the bottom or top of the page
    //   const isBottomOfPage = window.innerHeight + currentScrollPos >= document.body.offsetHeight;
    //   const isScrolledUpOrTop = currentScrollPos < prevScrollPos;

    //   if (isBottomOfPage || isScrolledUpOrTop) {
    //     setIsVisible(true); // Make header visible

    //     console.log("visible");
    //   } else {
    //     console.log("not visible");
    //     setIsVisible(false); // Hide header
    //   }

    //   setPrevScrollPos(currentScrollPos);
    // };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (!ready) {
      window.addEventListener("resize", handleResize);
      // window.addEventListener("scroll", setDisplayHeaderAction);
      verifyCookieAction({ setRoute, setTheme, setReady, handlePageLoading, router, enqueueSnackbar });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("scroll", setDisplayHeaderAction);
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

  const handleResize = () => setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight }),
    handlePageLoading = ({ url, loading }: HandlePageLoading) => handlers.handlePageLoading({ url, loading, setLoading }),
    handleScroll = () => handlers.handleScroll({ prevScrollPos, setPrevScrollPos, setDisplayHeaderAction }),
    handleProtectedRoute = (auth?: boolean) =>
      handlers.handleProtectedRoute({ router, authenticated: auth || authenticated, setRoute, setActiveRouteAction, enqueueSnackbar, closeSnackbar });

  return <Layout ready={ready} theme={theme} route={route} loading={loading} Component={Component} pageProps={pageProps} emotionCache={emotionCache} />;
});
