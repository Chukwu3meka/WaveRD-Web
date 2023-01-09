const initialState: any = { status: false };

const authReducer = (state = initialState, { payload, type }: { payload: any; type: any }) => {
  switch (type) {
    case "SET_AUTH":
      return payload;
    default:
      return state;
  }
};

export default authReducer;
