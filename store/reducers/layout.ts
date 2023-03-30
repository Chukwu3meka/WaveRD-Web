const layoutReducer = (state = {}, { payload, type }: { payload: any; type: string }) => {
  switch (type) {
    case "SET_DEVICE_SIZE":
      return { ...state, deviceWidth: payload.width, deviceHeight: payload.height };
    case "SET_ACTIVE_ROUTE":
      return { ...state, activeRoute: payload };
    default:
      return state;
  }
};

export default layoutReducer;
