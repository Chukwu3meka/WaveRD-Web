// import { sleep } from "@utils/clientFuncs";
import { IHandleScroll, IFunctionsHandleResize, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";
import fetcher from "@utils/fetcher";
import { deObfuscate } from "@utils/handlers";

export const handleResize = ({ setDeviceSizeAction }: IFunctionsHandleResize) => {
  const width = window.innerWidth,
    height = window.innerHeight;
  setDeviceSizeAction({ width, height });
};

export const handlePageLoading = ({ url, loading, setPageLoading }: IFunctionsHandlePageLoading) => {
  // if (url) console.log(`Switching page to ${url}`);

  if (loading) {
    setPageLoading(true);
  } else {
    setTimeout(() => setPageLoading(false), 2000);
  }
};

// export const handleProtectedRoute = ({ route }: IHandleProtectedRoute) => {
export const handleProtectedRoute = ({ router, authenticated }: any) => {
  const route = location.pathname;
  // const params = Object.fromEntries(new URLSearchParams(location.search));

  const protectedRoutes = ["/auth/signin", "/auth/signup"];
  const unProtectedRoutes = ["/", "/apihub", "/auth/reset", "/auth/signin", "/auth/signup", "/organization"];

  if (authenticated && protectedRoutes.includes(route)) router.push("/");
  if (authenticated && !unProtectedRoutes.includes(route)) router.push("/");

  // console.log({ route, authenticated });
  // console.log("useEffect fired!", { asPath: route });
};

export const handleScroll = ({ window, lastScrollPos, setDisplayHeader, setLastScrollPos }: IHandleScroll) => {
  if (window.scrollY > lastScrollPos) {
    setDisplayHeader(false);
  } else {
    setDisplayHeader(true);
  }
  setLastScrollPos(window.scrollY);
};

export const retrieveCookie = async ({ setAuthAction }: any) => {
  const params = Object.fromEntries(new URLSearchParams(location.search)),
    { facebook, twitter, google, response } = params,
    oAuthID = deObfuscate(decodeURIComponent(response as string));

  if (!facebook && !twitter && !google && response) {
    fetcher({ api: "accounts", endpoint: "/personal/oAuthSession", method: "POST", payload: { oAuthID } })
      .then(({ payload: { role, fullName, handle } }) => setAuthAction({ role, fullName, handle }))
      .catch((err) => {});
  } else {
    await fetcher({ api: "accounts", method: "GET", endpoint: "/personal/cookie" })
      .then(({ payload: { role, fullName, handle } }) => setAuthAction({ role, fullName, handle }))
      .catch((err) => {});
  }
};
