import { IFunctionsHandleResize, IFunctionsHandlePageLoading, IHandleProtectedRoute } from "@interface/main/layout-interface";

export const handleResize = ({ setDeviceSizeAction }: IFunctionsHandleResize) => {
  const width = window.innerWidth,
    height = window.innerHeight;
  setDeviceSizeAction({ width, height });
};

export const handlePageLoading = ({ url, loading, setPageLoading }: IFunctionsHandlePageLoading) => {
  if (url) console.log(`Switching page to ${url}`);

  if (loading) {
    setPageLoading(true);
  } else {
    setTimeout(() => setPageLoading(false), 2000);
  }
};

export const handleProtectedRoute = ({ route }: IHandleProtectedRoute) => {
  console.log("useEffect fired!", { asPath: route });
};
