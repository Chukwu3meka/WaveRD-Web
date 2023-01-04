import { IFunctionsHandleResize, IFunctionsHandlePageLoading } from "@interface/main/layout-interface";

export const handleResize = ({ setDeviceSizeAction, setSmallScreen }: IFunctionsHandleResize) => {
  const width = window.innerWidth,
    height = window.innerHeight;

  setDeviceSizeAction({ width, height });
  setSmallScreen(width < 900 || height < 600);
};

export const handlePageLoading = ({ url, loading, setPageLoading }: IFunctionsHandlePageLoading) => {
  // console.log("handlePageLoading", url, loading);
  if (loading) {
    setPageLoading(true);
  } else {
    setTimeout(() => setPageLoading(false), 2000);
  }
};
