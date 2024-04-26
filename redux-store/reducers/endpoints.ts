import { InitState } from "interfaces/redux-store/account.interfaces";
import { INIT_PROFILE } from "utils/constants";

const initState = { filter: "", phrase: "" };

// authenticated: false,

// const endpointsReducer = (state: InitState = initState, { data, type }: { data: any; type: string }) => {
const endpointsReducer = (state = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_ENDPOINTS_PARAM":
      return { ...state, filter: data.filter, phrase: data.phrase };

    default:
      return state;
  }
};

export default endpointsReducer;
