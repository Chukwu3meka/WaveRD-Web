const profileReducer = (state = { auth: {} }, { payload, type }) => {
  switch (type) {
    case "MANAGE_CLUB":
      return { ...state, manageClubStatus: payload };
    case "SET_MANAGER":
      return { ...state, auth: payload };
    case "RESET_PASSWORD":
      return { ...state, resetPasswordOTP: payload };
    //     case FETCH_PORTFOLIO:
    //       return { ...state, portfolio: payload };
    //     case FETCH_MANAGERS:
    //       return { ...state, managers: payload };
    //     case POST_SETTINGS:
    //       return { ...state, settings: payload };
    //     case IS_EMAIL_TAKEN:
    //       return { ...state, isEmailTaken: payload };
    //     case VERIFY_EMAIL:
    //       return { ...state, verified: payload };
    //     case RESET_PASSWORD:
    //       return { ...state, resetStatus: payload };
    default:
      return state;
  }
};

export default profileReducer;
