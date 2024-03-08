const massesReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "FETCH_MASS_DATA":
      return { ...state, massData: payload };
    case "FETCH_HOME_DATA":
      return { ...state, homePageData: payload };
    case "FETCH_TOURNAMENT":
      return { ...state, tournament: payload };
    case "FETCH_TOURNAMENT":
      return { ...state, tournament: payload };
    case "FETCH_OFFERS":
      return { ...state, offers: payload };
    case "FETCH_OFFER":
      return { ...state, transfers: payload };

    // case FETCH_SIGNUP_DIVISIONS:
    //   return { ...state, divisions: payload };
    // case FETCH_NEWS:
    //   return { ...state, news: payload };
    // case FETCH_LEAGUE:
    //   return { ...state, league: payload };
    // case FETCH_COMPETITION:
    //   return { ...state, competition: payload };
    // case FETCH_RECORDS:
    //   return { ...state, records: payload };
    // case FETCH_TRANSFERS:
    //   return { ...state, transfers: payload };
    // case FETCH_CURRENT_MATCHES:
    //   return { ...state, currentMatches: payload };
    // case FETCH_HOME_TABLES:
    //   return { ...state, tables: payload };
    // case FETCH_AWARDS:
    //   return { ...state, awards: payload };
    // case GET_AVAILABLE_TEAM:
    //   return { ...state, availableTeam: payload };
    default:
      return state;
  }
};

export default massesReducer;
