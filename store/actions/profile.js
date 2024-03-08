import decode from "jwt-decode";

import API from "@utils/api";
import { removeErrorAction, catchErr } from "./error";
import { deObfuscate } from "@utils/clientFuncs";

export const manageClubAction = (data) => {
  return async (dispatch) => {
    try {
      await API.noAuthCall("post", `profile/signup`, data);
      dispatch({ type: "MANAGE_CLUB", payload: true });
      dispatch(removeErrorAction("all"));
    } catch (err) {
      return catchErr(dispatch, err, "MANAGE_CLUB");
    }
  };
};

export const resetPasswordOTPSenderAction = (data) => {
  return async (dispatch) => {
    try {
      const { resetToken } = await API.noAuthCall("post", `profile/resetPasswordOTPSender`, data);
      dispatch({ type: "RESET_PASSWORD", payload: deObfuscate(resetToken) });
      dispatch(removeErrorAction("RESET_PASSWORD"));
    } catch (err) {
      return catchErr(dispatch, err, "RESET_PASSWORD");
    }
  };
};

export const resetPasswordAction = (data) => {
  return async (dispatch) => {
    try {
      await API.noAuthCall("post", `profile/resetPassword`, data);
      dispatch({ type: "FINALIZE_RESET_PASSWORD", payload: true });
      dispatch(removeErrorAction("FINALIZE_RESET_PASSWORD"));
    } catch (err) {
      return catchErr(dispatch, err, "FINALIZE_RESET_PASSWORD");
    }
  };
};

export const authUserAction = (data) => {
  return async (dispatch) => {
    try {
      if (localStorage) {
        const { token, handle, division, mass, club } = await API.noAuthCall("post", "profile/signin", data);
        API.setToken(token);
        localStorage.setItem("SoccerMASS", token);
        dispatch({ type: "SET_MANAGER", payload: { handle, division, mass, club } });
        dispatch(removeErrorAction("all"));
      }
    } catch (err) {
      if (err?.response && err?.response?.data === "email not verified") return catchErr(dispatch, err, "EMAIL_NOT_VERIFIED");
      if (err?.response && err?.response?.data === "invalid credentials") return catchErr(dispatch, err, "INVALID_EMAIL/PASSWORD");
      console.log(err);
      return catchErr(dispatch, err, "TEMPORARY_SERVER_ERROR");
    }
  };
};

export const oAuthUserAction = (clientToken) => {
  return async (dispatch) => {
    try {
      if (localStorage) {
        const { token, handle, division, mass, club } = decode(clientToken);
        dispatch({ type: "SET_MANAGER", payload: { handle, division, mass, club } });
        API.setToken(token);
        dispatch(removeErrorAction("all"));
        localStorage.setItem("SoccerMASS", token);
      } else {
        throw "Local Storage not accesible";
      }
    } catch (error) {
      return catchErr(dispatch, error, "OAUTH_NOT_REACHEABLE");
    }
  };
};

export const persistUserAction = () => {
  return async (dispatch) => {
    try {
      const localToken = localStorage && localStorage.SoccerMASS;

      if (localToken) {
        const { token, handle, division, mass, club } = await API.noAuthCall("post", `profile/persistUser`, {
          session: decode(localToken).session,
        });
        API.setToken(token);
        dispatch({ type: "SET_MANAGER", payload: { handle, division, mass, club } });
        dispatch(removeErrorAction("all"));
      } else {
        API.setToken(null);
        dispatch({ type: "SET_MANAGER", payload: {} });
      }
    } catch (err) {
      API.setToken(null);
      return catchErr(
        dispatch,
        err?.response?.data || err.message,
        err?.response?.data === "suspicious token" ? "SUSPICIOUS_TOKEN" : "SET_MANAGER"
      );
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    API.setToken(null);
    localStorage.clear();
    dispatch({ type: "SET_MANAGER", payload: {} });
  };
};
