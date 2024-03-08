import API from "@utils/api";
import { removeErrorAction, catchErr } from "./error";

export const fetchPlayerAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `player/fetchPlayer`, data);
      await dispatch({ type: "FETCH_PLAYER", payload });
      await dispatch(removeErrorAction("FETCH_PLAYER"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_PLAYER");
    }
  };
};

export const fetchRandomAgentsAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `player/randomAgents`, data);
      await dispatch({ type: "FETCH_RANDOM_AGENTS", payload });
      await dispatch(removeErrorAction("FETCH_RANDOM_AGENTS"));
    } catch (err) {
      return catchErr(dispatch, err, "FETCH_RANDOM_AGENTS");
    }
  };
};

export const searchPlayersAction = (data) => {
  return async (dispatch) => {
    try {
      const payload = await API.authCall("post", `player/searchPlayers`, data);
      await dispatch({ type: "SEARCH_PLAYERS", payload });
      await dispatch(removeErrorAction("SEARCH_PLAYERS"));
    } catch (err) {
      return catchErr(dispatch, err, "SEARCH_PLAYERS");
    }
  };
};

export const listPlayerAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `player/listPlayer`, data);
      await dispatch(removeErrorAction("LIST_PLAYER"));
    } catch (err) {
      return catchErr(dispatch, err, "LIST_PLAYER");
    }
  };
};

export const releasePlayerAction = (data) => {
  return async (dispatch) => {
    try {
      await API.authCall("post", `player/releasePlayer`, data);
      await dispatch(removeErrorAction("RELEASE_PLAYER"));
    } catch (err) {
      return catchErr(dispatch, err, "RELEASE_PLAYER");
    }
  };
};
