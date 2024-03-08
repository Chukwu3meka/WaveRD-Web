const clubsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "FETCH_SQUAD":
      return { ...state, squad: payload };
    case "FETCH_CLUB_PLAYERS":
      return { ...state, clubPlayers: payload };
    case "FETCH_TACTICS":
      return { ...state, tactics: payload };
    case "FETCH_HISTORY":
      return { ...state, history: payload };
    case "FETCH_FINANCE":
      return { ...state, finance: payload };
    case "SAVE_TACTICS":
      return { ...state, tacticsSaved: payload };
    case "FETCH_TARGETS":
      return { ...state, targets: payload };
    default:
      return state;
  }
};

export default clubsReducer;
