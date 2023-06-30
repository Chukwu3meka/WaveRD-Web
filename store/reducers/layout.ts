import { LayoutState } from "@interface/store/layout";

const initialState: LayoutState = {
  header: false,
  route: "/",
  height: 0,
  width: 0,
  theme: "light",
};

const layoutReducer = (state: LayoutState = initialState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, ...data };
    case "SET_ACTIVE_ROUTE":
      return { ...state, route: data };
    case "SET_THEME":
      return { ...state, theme: data };
    case "SET_DISPLAY_HEADER":
      return { ...state, header: data };
    default:
      return state;
  }
};

export default layoutReducer;
