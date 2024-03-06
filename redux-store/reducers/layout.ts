import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { INIT_PROFILE } from "utils/constants";

const initialState: LayoutState = { displayHeader: false, route: "/", height: 0, width: 0 };

const layoutReducer = (state: LayoutState = initialState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, ...data };
    case "SET_ACTIVE_ROUTE":
      return { ...state, route: data };
    case "SET_DISPLAY_HEADER":
      return { ...state, displayHeader: data };
    default:
      return state;
  }
};

export default layoutReducer;
