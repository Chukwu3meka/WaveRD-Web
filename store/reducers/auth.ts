const authReducer = (state = { status: false }, { payload, type }: { payload: any; type: any }) => {
  switch (type) {
    case "SET_AUTH":
      return payload;
    default:
      return state;
  }
};

export default authReducer;
