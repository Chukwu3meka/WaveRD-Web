import { HandlePageLoading, RoutesHandler, HandleScroll } from "@interface/components/layouts/layoutsInterface";
import { logoutRoutes, protectedRoutes } from "@utils/constants/routes";

export const handlePageLoading = ({ url, loading, setLoading }: HandlePageLoading) => {
  // if (url) console.log(`Switching page to ${url}`);

  window.scrollTo({ top: 0, behavior: "smooth" }); // <= Smoothly scroll to the top of the page on page load

  if (loading && !url.startsWith("/info/")) {
    setLoading(true);
  } else {
    setTimeout(() => setLoading(false), 2000);
  }
};

export const routesHandler = ({ router, authenticated, setRoute, setActiveRouteAction, enqueueSnackbar }: RoutesHandler) => {
  const route = location.pathname,
    notHomePage = !!route.split("/")[1];

  setRoute(route);
  setActiveRouteAction(route);

  if (notHomePage && authenticated)
    for (const path of logoutRoutes)
      if (route.startsWith(path))
        enqueueSnackbar("You need to sign out to access this route", {
          variant: "error",
          onEntered: () => router.push(router.query && router.query.redirect ? (router.query.redirect as string) : "/"),
        });

  if (notHomePage && !authenticated)
    for (const path of protectedRoutes)
      if (route.startsWith(path))
        enqueueSnackbar("You need to be authenticated to access this route", {
          variant: "error",
          onEntered: () => router.push(`/accounts/signin?redirect=${route}`),
        });
};

export const handleScroll = ({ prevScrollPos, setPrevScrollPos, setDisplayHeaderAction }: HandleScroll) => {
  const currentScrollPos = window.pageYOffset,
    scrolledUp = currentScrollPos < prevScrollPos,
    closeToRelativeHeader = currentScrollPos > 66.24 * 2,
    atTheBottom = window.innerHeight + currentScrollPos >= document.body.offsetHeight;

  if (atTheBottom || (scrolledUp && closeToRelativeHeader)) {
    setDisplayHeaderAction(true);
  } else {
    setDisplayHeaderAction(false);
  }
  setPrevScrollPos(currentScrollPos);
};
