import API from "@utils/api";
import { removeErrorAction, catchErr } from "./error";

export const fetchMassDataAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.noAuthCall("post", `mass/fetchMassData`, data);
      await dispatch({ type: "FETCH_MASS_DATA", payload });
      await dispatch(removeErrorAction("MASS_DATA"));
    } catch (err) {
      return catchErr(dispatch, err, "MASS_DATA");
    }
  };
};

export const fetchHomePageDataAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `mass/fetchHomeData`, data);
      await dispatch({ type: "FETCH_HOME_DATA", payload });
      await dispatch(removeErrorAction("FETCH_HOME_DATA"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_HOME_DATA");
    }
  };
};

export const fetchTournamentAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `mass/fetchTournament`, data, dispatch);
      await dispatch({ type: "FETCH_TOURNAMENT", payload });
      await dispatch(removeErrorAction("FETCH_TOURNAMENT"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_TOURNAMENT");
    }
  };
};

export const sendOfferAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `mass/sendOffer`, data, dispatch);
      await dispatch(removeErrorAction("all"));
    } catch (err) {
      if (
        [
          "Insuffucent Funds",
          "Previous Offer not attended to",
          "Player currently suspended from transfer",
          "Salary Cap will be exceeded after signing",
        ].includes(err.response.data)
      )
        return catchErr(dispatch, err, err.response.data);
      return catchErr(dispatch, err, "SEND_OFFER");
    }
  };
};

export const fetchOffersAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `mass/fetchOffers`, data, dispatch);
      await dispatch({ type: "FETCH_OFFERS", payload });
      await dispatch(removeErrorAction("FETCH_OFFERS"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_OFFERS");
    }
  };
};

export const callOffOfferAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `mass/callOffOffer`, data, dispatch);
      await dispatch(removeErrorAction("CALL_OFF_OFFER"));
    } catch (err) {
      return catchErr(dispatch, err, "CALL_OFF_OFFER");
    }
  };
};

export const acceptOfferAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `mass/acceptOffer`, data, dispatch);
      await dispatch(removeErrorAction("ACCEPT_OFFER"));
    } catch (err) {
      if (
        ["Illegal Transaction", "Insufficient Funds", "Max Squad limit reached", "Min Squad limit reached"].includes(err.response.data)
      )
        return catchErr(dispatch, err, err.response.data);

      return catchErr(dispatch, err, "ACCEPT_OFFER");
    }
  };
};

export const fetchTransfersAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `mass/fetchTransfers`, data, dispatch);
      await dispatch({ type: "FETCH_OFFER", payload });
      await dispatch(removeErrorAction("FETCH_OFFER"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_OFFER");
    }
  };
};

// export const getClubsForSignup = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `clubs/getClubsForSignup`, data);
//       await dispatch({ type: "CLUBS_FOR_SIGNUP", payload });
//       await dispatch(removeErrorAction());
//     } catch (err) {
//       await dispatch(addErrorAction("Server Error: Unable to fetch signup clubs"));
//     }
//   };
// };

// export const fetchSignupDivisions = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getAvailableTeam`, data);
//       dispatch({ type: FETCH_SIGNUP_DIVISIONS, payload });
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const getCurrentMatches = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getcurrentMatches`, data);
//       dispatch({ type: FETCH_CURRENT_MATCHES, payload });
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const getHomeTables = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getHomeTables`, data);
//       dispatch({ type: FETCH_HOME_TABLES, payload });
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const getNews = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getnews`, data);
//       dispatch({ type: FETCH_NEWS, payload });
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };

// export const getAvailableTeam = () => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getAvailableTeam`);
//       const soccermassOptions = [];
//       payload.forEach((x) => {
//         const [soccermass, available] = x;
//         soccermassOptions.push([soccermass, `${soccermass.toUpperCase()} ~ ${available}`]);
//       });
//       dispatch({ type: GET_AVAILABLE_TEAM, payload: soccermassOptions });
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };

// export const fetchLeague = (payload) => ({
//   type: FETCH_LEAGUE,
//   payload,
// });
// export const leagueData = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/leaguedata`, data);
//       dispatch(fetchLeague(payload));
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const fetchCompetition = (payload) => ({
//   type: FETCH_COMPETITION,
//   payload,
// });
// export const getCompetition = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/competition`, data);
//       dispatch(fetchCompetition(payload));
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const fetchRecords = (payload) => ({
//   type: FETCH_RECORDS,
//   payload,
// });
// export const getRecords = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getrecords`, data);
//       dispatch(fetchRecords(payload));
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const fetchTransfers = (payload) => ({
//   type: FETCH_TRANSFERS,
//   payload,
// });
// export const getTransfers = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/transfers`, data);
//       dispatch(fetchTransfers(payload));
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
// export const fetchAwards = (payload) => ({
//   type: FETCH_AWARDS,
//   payload,
// });
// export const getAwards = (data) => {
//   return async (dispatch) => {
//     try {
//       const payload = await API.call("post", `mass/getawards`, data);
//       dispatch(fetchAwards(payload));
//       dispatch(removeErrorAction());
//     } catch (err) {
//       dispatch(addErrorAction(err));
//     }
//   };
// };
