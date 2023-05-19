import { HandlePageLoading, HandleProtectedRoute, HandleScroll } from "@interface/components/layouts/layoutsInterface";
import { accountsRoute, protectedRoutes } from "@utils/constants/routes";

export const handlePageLoading = ({ url, loading, setLoading }: HandlePageLoading) => {
  // if (url) console.log(`Switching page to ${url}`);

  window.scrollTo({ top: 0, behavior: "smooth" }); // <= Smoothly scroll to the top of the page on page load

  if (loading && !url.startsWith("/info/")) {
    setLoading(true);
  } else {
    setTimeout(() => setLoading(false), 2000);
  }
};

export const handleProtectedRoute = ({ router, authenticated, setRoute, setActiveRouteAction, enqueueSnackbar, closeSnackbar }: HandleProtectedRoute) => {
  const route = location.pathname;

  setRoute(route);
  setActiveRouteAction(route);

  if (authenticated) for (const route of accountsRoute) if (location.pathname.startsWith(route)) router.push("/"); // Signout to access this page
  if (!authenticated) for (const route of protectedRoutes) if (location.pathname.startsWith(route)) router.push("/accounts/signin"); // Signin to access this page
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
