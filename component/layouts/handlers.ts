import { SetDeviceSizeAction } from "@interface/store/layout";
import { IHandleScroll, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

// export const handlePageLoading = ({ url, loading, setPageLoading, setLayout }: IFunctionsHandlePageLoading) => {
export const handlePageLoading = ({ url, loading, setLoading }: any) => {
  // if (url) console.log(`Switching page to ${url}`);
  window.scrollTo({ top: 0, behavior: "smooth" }); // <= Smoothly scroll to the top of the page on page load
  if (loading) {
    setLoading(true);
  } else {
    setTimeout(() => setLoading(false), 2000);
  }
};

// export const handleProtectedRoute = ({ route }: IHandleProtectedRoute) => {
export const handleProtectedRoute = ({ router, authenticated, setRoute }: any) => {
  const route = location.pathname;

  setRoute(route);

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

export const handleScroll = ({ setDisplayHeaderAction }) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const lastScrollTop = sessionStorage.getItem("lastScrollTop") || 0;

  if (scrollTop > +lastScrollTop - 5) {
    setDisplayHeaderAction(false);
  } else {
    setDisplayHeaderAction(true);
  }

  sessionStorage.setItem("lastScrollTop", scrollTop.toString());
};
