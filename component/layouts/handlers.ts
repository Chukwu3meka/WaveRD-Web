import { SetDeviceSizeAction } from "@interface/store/layout";
import { IHandleScroll, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

// export const handlePageLoading = ({ url, loading, setPageLoading, setLayout }: IFunctionsHandlePageLoading) => {
export const handlePageLoading = ({ url, loading, setLoading }: any) => {
  setLoading(false);
  // Smoothly scroll to the top of the page on page load
  // if (url) console.log(`Switching page to ${url}`);
  // layout
  // if (loading) {
  //   // setLoading(true);
  // } else {
  //   setTimeout(() => setLoading(false), 2000);
  //   // window.scrollTo({ top: 0, behavior: "smooth" });
  // }
};

// export const handleProtectedRoute = ({ route }: IHandleProtectedRoute) => {
export const handleProtectedRoute = ({ router, authenticated, setLayout }: any) => {
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

  const path = location.pathname.split("/")[1];

  console.log(path);
  // console.log({ path, s: location.pathname });

  const layout = path === "accounts" ? "accounts" : path === "info" ? "info" : "default";

  setLayout(layout);
};

export const handleScroll = ({ setDisplayHeaderAction, setLastScrollPos }) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // const lastScrollTop = sessionStorage.getItem("lastScrollTop") || 0;

  const lastScrollTop = sessionStorage.getItem("lastScrollTop") || 0;

  console.log({ scrollTop, lastScrollTop });
  if (scrollTop > +lastScrollTop - 5) {
    console.log("down");
    setDisplayHeaderAction(false);
  } else {
    setDisplayHeaderAction(true);
    console.log("up");
  }
  console.log({ scrollTop });

  sessionStorage.setItem("lastScrollTop", scrollTop.toString());
  // setLastScrollPos(scrollTop);
};
