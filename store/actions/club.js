import API from "@utils/api";
import { removeErrorAction, catchErr } from "./error";

export const fetchClubPlayersAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.noAuthCall("post", `club/fetchClubPlayers`, data, dispatch);
      await dispatch({ type: "FETCH_CLUB_PLAYERS", payload });
      await dispatch(removeErrorAction("FETCH_CLUB_PLAYERS"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_CLUB_PLAYERS");
    }
  };
};

export const fetchSquadAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/fetchSquad`, data, dispatch);
      await dispatch({ type: "FETCH_SQUAD", payload });
      await dispatch(removeErrorAction("FETCH_SQUAD"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_SQUAD");
    }
  };
};

export const fetchTacticsAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/fetchTactics`, data, dispatch);
      await dispatch({ type: "FETCH_TACTICS", payload });
      await dispatch(removeErrorAction("FETCH_TACTICS"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_TACTICS");
    }
  };
};

export const fetchHistoryAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/fetchHistory`, data, dispatch);
      await dispatch({ type: "FETCH_HISTORY", payload });
      await dispatch(removeErrorAction("FETCH_HISTORY"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_HISTORY");
    }
  };
};

export const fetchFinanceAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/fetchFinance`, data, dispatch);
      await dispatch({ type: "FETCH_FINANCE", payload });
      await dispatch(removeErrorAction("FETCH_FINANCE"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_FINANCE");
    }
  };
};

export const saveTacticsAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/saveTactics`, data, dispatch);
      await dispatch({ type: "SAVE_TACTICS", payload });
      await dispatch(removeErrorAction("SAVE_TACTICS"));
    } catch (err) {
      return catchErr(dispatch, err, "SAVE_TACTICS");
    }
  };
};

export const fetchTargetsAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `club/fetchTargets`, data, dispatch);
      await dispatch({ type: "FETCH_TARGETS", payload });
      await dispatch(removeErrorAction("FETCH_TARGETS"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_TARGETS");
    }
  };
};

export const targetPlayerAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `club/targetPlayer`, data, dispatch);
      await dispatch(removeErrorAction("TARGET_PLAYER"));
    } catch (err) {
      return catchErr(dispatch, err, "TARGET_PLAYER");
    }
  };
};
