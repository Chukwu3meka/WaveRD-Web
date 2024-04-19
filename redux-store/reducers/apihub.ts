import { InitState } from "interfaces/redux-store/account.interfaces";
import { INIT_PROFILE } from "utils/constants";

const initState = {
  endpoints: { filter: "", phrase: "" },
  // authenticated: false,
};

// const apihubReducer = (state: InitState = initState, { data, type }: { data: any; type: string }) => {
const apihubReducer = (state = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_ENDPOINTS":
      return { ...state, endpoints: { ...state.endpoints, ...data } };

    default:
      return state;
  }
};

export default apihubReducer;
