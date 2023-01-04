export interface IFunctionsHandleResize {
  setDeviceSizeAction: Function;
  setSmallScreen: Function;
}

export interface IHandlePageLoading {
  url: null | string;
  loading: boolean;
}

export interface IFunctionsHandlePageLoading extends IHandlePageLoading {
  setPageLoading: Function;
}
