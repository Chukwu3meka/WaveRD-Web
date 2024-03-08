const layoutReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case "SET_SLIDE_TEXT":
      return { ...state, slideText: payload };
    case "SET_DEVICE_WIDTH":
      return { ...state, deviceWidth: payload };
    default:
      return state;
  }
};

export default layoutReducer;
