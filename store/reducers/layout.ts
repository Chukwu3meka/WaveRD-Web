import { LayoutState } from "@interface/store/layout";

const initialState = {
  activeRoute: "/",
  deviceHeight: 0,
  deviceWidth: 0,
};

const layoutReducer = (state: LayoutState = initialState, { payload, type }: { payload: LayoutState; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, ...payload };
    case "SET_ACTIVE_ROUTE":
      return { ...state, activeRoute: payload };
    default:
      return state;
  }
};

export default layoutReducer;
