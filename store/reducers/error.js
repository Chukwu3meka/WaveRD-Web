import { uniqueArray } from "@utils/clientFuncs";

const errorReducers = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD_ERROR":
      return uniqueArray([payload, ...state]);
    case "REMOVE_ERROR": {
      if (payload === "all") {
        return [];
      } else if (typeof payload === "object") {
        state = payload.forEach((payload) => {
          state.filter((x) => x !== payload);
        });
        return state || [];
      } else {
        return state.filter((x) => x !== payload) || [];
      }
    }
    default:
      return state || [];
  }
};

export default errorReducers;
