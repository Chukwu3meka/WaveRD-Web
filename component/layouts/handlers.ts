import { HandlePageLoading, HandleProtectedRoute, HandleScroll } from "@interface/components/layouts-interface";

export const handlePageLoading = ({ url, loading, setLoading }: HandlePageLoading) => {
  // if (url) console.log(`Switching page to ${url}`);
  window.scrollTo({ top: 0, behavior: "smooth" }); // <= Smoothly scroll to the top of the page on page load
  if (loading) {
    setLoading(true);
  } else {
    setTimeout(() => setLoading(false), 2000);
  }
};

export const handleProtectedRoute = ({ router, authenticated, setRoute, setActiveRouteAction }: HandleProtectedRoute) => {
  const route = location.pathname;

  setRoute(route);
  setActiveRouteAction(route);

  // console.log{route}

  const accountsRoute = ["/accounts/signin", "/accounts/signup"],
    protectedRoutes = ["/manager"];
  // publicRoutes = ["/", "/apihub", "/accounts/reset", "/accounts/signin", "/accounts/signup", "/organization"];

  if (authenticated && accountsRoute.includes(route)) {
    router.push("/"); // Signout to access this page
  }
  if (!authenticated && protectedRoutes.includes(route)) {
    router.push("/"); // Signin to access this page
  }
};

export const handleScroll = ({ setDisplayHeaderAction }: HandleScroll) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const lastScrollTop = sessionStorage.getItem("lastScrollTop") || 0;

  if (scrollTop > +lastScrollTop - 5) {
    setDisplayHeaderAction(false);
  } else {
    setDisplayHeaderAction(true);
  }

  sessionStorage.setItem("lastScrollTop", scrollTop.toString());
};
