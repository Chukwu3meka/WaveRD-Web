import { LayoutState, SetThemeAction } from "@interface/store/layout";

const initialState: LayoutState = {
  displayHeader: false,
  activeRoute: "/",
  deviceHeight: 0,
  deviceWidth: 0,
  theme: "light",
};

const layoutReducer = (state: LayoutState = initialState, { payload, type }: { payload: LayoutState; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, ...payload };
    case "SET_ACTIVE_ROUTE":
      return { ...state, activeRoute: payload };
    case "SET_THEME":
      return { ...state, theme: payload };
    case "SET_DISPLAY_HEADER":
      return { ...state, displayHeader: payload };
    default:
      return state;
  }
};

export default layoutReducer;
