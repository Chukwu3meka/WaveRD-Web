// import { sleep } from "@utils/clientFuncs";
import { IHandleScroll, IFunctionsHandleResize, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";
import fetcher from "@utils/fetcher";

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
export const handleProtectedRoute = ({ route, authenticated }: any) => {
  console.log({ route, authenticated });
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
  await fetcher({
    api: "accounts",
    method: "GET",
    endpoint: "/personal/cookie",
  })
    .then(({ payload: { role, fullName, handle } }) => {
      console.log({ role, fullName, handle });

      setAuthAction({ role, fullName, handle });
    })
    .catch();
};
