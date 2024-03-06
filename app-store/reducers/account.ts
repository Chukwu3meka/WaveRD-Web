import { InitState } from "interfaces/redux-store/account.interfaces";
import { INIT_PROFILE } from "utils/constants";

const initState: InitState = {
  profile: INIT_PROFILE,
  authenticated: false,
};

const authReducer = (state: InitState = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_PROFILE":
      const prevState: InitState = { profile: data, authenticated: data.role !== INIT_PROFILE.role };
      return prevState;

    // case "SET_AUTHENTICATED":
    //   if (typeof data === "boolean") {
    //     const prevState: InitialState = { ...initialState, authenticated: false };
    //     return prevState;
    //   }

    default:
      return state;
  }
};

export default authReducer;
