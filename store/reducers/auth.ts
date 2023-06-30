import { AuthState } from "@interface/store/auth";

const initialState = null;

// const authReducer = (state: AuthState = initialState, { data, type }: { data: Partial<AuthState>; type: string }) => {
const authReducer = (state: AuthState = initialState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_AUTH":
      return data;
    default:
      return state;
  }
};

export default authReducer;
