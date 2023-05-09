import { AuthState } from "@interface/store/auth";

const initialState = null;

const authReducer = (state: AuthState = initialState, { payload, type }: { payload: AuthState; type: string }) => {
  switch (type) {
    case "SET_AUTH":
      return payload;
    default:
      return state;
  }
};

export default authReducer;
