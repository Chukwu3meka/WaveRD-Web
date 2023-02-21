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
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const { facebook, twitter, google, response } = params;

  // console.log({ params });

  // console.log({ facebook, twitter, google, response, j: router.query, a: window.location });

  // const urlResponse = deObfuscate(decodeURIComponent(response as string));

  const oAuthID = deObfuscate(decodeURIComponent(response as string));

  // console.log({ urlResponse });

  if (!facebook && !twitter && !google && response) {
    fetcher({
      api: "accounts",
      endpoint: "/personal/oAuthSession",
      method: "POST",
      payload: { oAuthID },
    })
      .then(({ payload: { role, fullName, handle } }) => {
        console.log({ role, fullName, handle });

        setAuthAction({ role, fullName, handle });
      })
      .catch((err) => {
        console.log(err);
      });
    // .catch(({ message }) => enqueueSnackbar(message || "Invalid Oauth", { variant: "error" }))
    // .finally(() => setUserForm((userForm: any) => ({ ...userForm, buttonLoading: false }))); // deactivate botton loading
  } else {
    await fetcher({
      api: "accounts",
      method: "GET",
      endpoint: "/personal/cookie",
    })
      .then(({ payload: { role, fullName, handle } }) => {
        console.log({ role, fullName, handle });

        setAuthAction({ role, fullName, handle });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
