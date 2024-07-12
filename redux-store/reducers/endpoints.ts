const initState = { filter: "", phrase: "" };

const endpointsReducer = (state = initState, { data, type }: { data: any; type: string }) => {
  switch (type) {
    case "SET_ENDPOINTS_PARAM":
      return { ...state, filter: data.filter, phrase: data.phrase };

    default:
      return state;
  }
};

export default endpointsReducer;
