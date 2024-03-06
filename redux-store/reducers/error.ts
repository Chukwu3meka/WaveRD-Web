// import { uniqueArray } from "@utils/clientFuncs";

const errorReducers = (state = [], { type, data }: { type: string; data: any }) => {
  switch (type) {
    case "ADD_ERROR":
    // return uniqueArray([data, ...state]);
    case "REMOVE_ERROR": {
      if (data === "all") {
        return [];
      } else if (typeof data === "object") {
        state = data.forEach((data: string) => {
          state.filter((x) => x !== data);
        });
        return state || [];
      } else {
        return state.filter((x) => x !== data) || [];
      }
    }
    default:
      return state || [];
  }
};

export default errorReducers;
