import axios from "axios";
import { catchErr } from "@store/actions/error";

const mode = process.env.NODE_ENV === "production" ? "https://soccermass.herokuapp.com/" : "http://localhost:5001/";

// const mode = "https://soccermass-dev.herokuapp.com/";

const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // No 'Access-Control-Allow-Origin' header is present on the requested resource.
    delete axios.defaults.headers.common["Authorization"];
  }
};

const authCall = async (method = "post", path, payload, dispatch) => {
  const token = localStorage && localStorage.SoccerMASS;
  if (token) {
    const { data } = await axios[method](`${mode}${path}`, payload);
    if (data === "suspicious token") {
      setToken(null);
      catchErr(dispatch, "suspicious token", "SUSPICIOUS_TOKEN");
      return dispatch({ type: "SET_MANAGER", payload: {} });
    } else {
      return data;
    }
  } else {
    setToken(null);
    catchErr(dispatch, "missing token", "MISSING_TOKEN");
    return dispatch({ type: "SET_MANAGER", payload: {} });
  }
};

const noAuthCall = async (method = "post", path, payload) => {
  const response = await axios[method](
    `${mode}${path}`,
    payload
    // {
    //   headers: {
    //     "Content-Type": "application/json;charset=UTF-8",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // }
  );
  // .then((res) => {
  //   console.log("RESPONSE RECEIVED: ", res);
  // })
  // .catch((err) => {
  //   console.log("AXIOS ERROR: ", err);
  // });
  return response?.data;

  fetch("/", { mode: "no-cors" });
};

export default { setToken, authCall, noAuthCall, mode };
