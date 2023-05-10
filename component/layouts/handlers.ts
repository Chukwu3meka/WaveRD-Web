import { SetDeviceSizeAction } from "@interface/store/layout";
import { IHandleScroll, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

// export const handlePageLoading = ({ url, loading, setPageLoading, setLayout }: IFunctionsHandlePageLoading) => {
export const handlePageLoading = ({ url, loading, setLayoutProps }: any) => {
  // Smoothly scroll to the top of the page on page load

  // if (url) console.log(`Switching page to ${url}`);

  // layout

  if (loading) {
    setLayoutProps((values) => ({ ...values, pageLoading: true }));
  } else {
    const path = location.pathname.split("/")[1];

    // console.log({ path, s: location.pathname });

    setTimeout(
      () => setLayoutProps((values) => ({ ...values, pageLoading: false, layout: path === "accounts" ? "accounts" : path === "info" ? "info" : "default" })),
      2000
    );
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

// export const handleScroll = ({ window, lastScrollPos, setDisplayHeader, setLastScrollPos }: IHandleScroll) => {
export const handleScroll = ({ window, lastScrollPos, setLayoutProps, setLastScrollPos }: any) => {
  if (window.scrollY > lastScrollPos || window.scrollY === 0) {
    setLayoutProps((values) => ({ ...values, displayHeader: false }));
  } else {
    setLayoutProps((values) => ({ ...values, displayHeader: true }));
  }

  setLastScrollPos(window.scrollY);
};
