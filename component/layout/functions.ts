import fetcher from "@utils/fetcher";
import { deObfuscate } from "@utils/handlers";

import { IHandleScroll, IFunctionsHandleResize, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

export const handleResize = ({ setDeviceSizeAction }: IFunctionsHandleResize) => {
  const width = window.innerWidth,
    height = window.innerHeight;
  setDeviceSizeAction({ width, height });
};

export const handlePageLoading = ({ url, loading, setPageLoading }: IFunctionsHandlePageLoading) => {
  // Smoothly scroll to the top of the page on page load

  // if (url) console.log(`Switching page to ${url}`);

  if (loading) {
    setPageLoading(true);
  } else {
    setTimeout(() => setPageLoading(false), 2000);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// export const handleProtectedRoute = ({ route }: IHandleProtectedRoute) => {
export const handleProtectedRoute = ({ router, authenticated }: any) => {
  const route = location.pathname;

  const accountsRoute = ["/accounts/signin", "/accounts/signup"],
    protectedRoutes = ["/manager"];
  // publicRoutes = ["/", "/apihub", "/accounts/reset", "/accounts/signin", "/accounts/signup", "/organization"];

  if (authenticated && accountsRoute.includes(route)) {
    router.push("/");
    // Signout to access this page
  }
  if (!authenticated && protectedRoutes.includes(route)) {
    router.push("/");
    // Signin to access this page
  }
};

export const handleScroll = ({ window, lastScrollPos, setDisplayHeader, setLastScrollPos }: IHandleScroll) => {
  if (window.scrollY > lastScrollPos || window.scrollY === 0) {
    setDisplayHeader(false);
  } else {
    setDisplayHeader(true);
  }

  setLastScrollPos(window.scrollY);
};

export const retrieveCookie = async ({ setAuthAction, setCookieNotice }: any) => {
  await fetcher({ api: "srv-accounts", method: "GET", endpoint: "/cookies" })
    .then(({ payload: { role, fullName, handle, cookieConsent } }) => {
      setAuthAction({ role, fullName, handle });
      if (!cookieConsent) setCookieNotice(true);
    })
    .catch(() => {});
};

export const notifyCookieUsage = async ({ setAuthAction, setCookieNotice }: any) => {};
