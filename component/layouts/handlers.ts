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

  // console.log(route);

  // console.log{route}
  // enqueueSnackbar("Error creating your account", { variant: "error" }); // <=  Inform user of regex error

  // console.log({ route, authenticated });

  // console.log(route, accountsRoute);

  if (authenticated) for (const route of accountsRoute) if (location.pathname.startsWith(route)) router.push("/"); // Signout to access this page
  if (!authenticated) for (const route of protectedRoutes) if (location.pathname.startsWith(route)) router.push("/accounts/signin"); // Signin to access this page

  // if (authenticated && accountsRoute.includes(route)) {
  //   router.push("/"); // Signout to access this page
  // }

  // if (!authenticated && protectedRoutes.includes(route)) {
  //   enqueueSnackbar("You need to be authenticated to access this page", { variant: "error" });
  //   // setTimeout(() => closeSnackbar(), 2500);
  //   router.push("/accounts/signin"); // Signin to access this page
  // }
};

// export const handleScroll = ({ setDisplayHeaderAction }: HandleScroll) => {
export const handleScroll = ({ prevScrollPos, setPrevScrollPos, setDisplayHeaderAction }: any) => {
  const currentScrollPos = window.pageYOffset;

  // Check if user has scrolled to the bottom or top of the page
  const isBottomOfPage = window.innerHeight + currentScrollPos >= document.body.offsetHeight;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos < 66.24;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos > 200;
  const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos > 66.24 * 2;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos > 0;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos > 66.24;
  // const isScrolledUpOrTop = currentScrollPos < prevScrollPos && currentScrollPos > 66.24;

  console.log(currentScrollPos < prevScrollPos, { currentScrollPos });

  if (isBottomOfPage || isScrolledUpOrTop) {
    setDisplayHeaderAction(true); // Make header visible

    // console.log("visible");
  } else {
    // console.log("not visible");
    setDisplayHeaderAction(false); // Hide header
  }

  setPrevScrollPos(currentScrollPos);

  // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // const lastScrollTop = Number(sessionStorage.getItem("lastScrollTop")) || 0;

  // if (scrollTop > lastScrollTop - 5) {
  //   // if (scrollTop > lastScrollTop + 86.04) {
  //   // if (scrollTop > lastScrollTop) {
  //   setDisplayHeaderAction(false);
  // } else {
  //   setDisplayHeaderAction(true);
  // }

  // sessionStorage.setItem("lastScrollTop", scrollTop.toString());
};
