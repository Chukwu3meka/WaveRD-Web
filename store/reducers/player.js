const clubsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "FETCH_PLAYER":
      return { ...state, player: payload };
    case "FETCH_RANDOM_AGENTS":
      return { ...state, randomAgents: payload };
    case "SEARCH_PLAYERS":
      return { ...state, searchPlayers: payload };
    default:
      return state;
  }
};

export default clubsReducer;
