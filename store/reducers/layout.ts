import { LayoutState, SetThemeAction } from "@interface/store/layout";
import { setThemeAction } from "store/actions";

const initialState = {
  header: false,
  route: "/",
  height: 0,
  width: 0,
  theme: setThemeAction["light"],
};

const layoutReducer = (state: LayoutState = initialState, { payload, type }: { payload: Partial<LayoutState>; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, ...payload };
    case "SET_ACTIVE_ROUTE":
      return { ...state, route: payload };
    case "SET_THEME":
      return { ...state, theme: payload };
    case "SET_DISPLAY_HEADER":
      return { ...state, header: payload };
    default:
      return state;
  }
};

export default layoutReducer;
