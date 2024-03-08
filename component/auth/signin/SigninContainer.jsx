import Router from "next/router";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Signin } from ".";
import validate from "@utils/validator";
import { deObfuscate, sleep } from "@utils/clientFuncs";
import { authUserAction, oAuthUserAction, setAuthSlideTextAction, removeErrorAction } from "@store/actions";

const SigninContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [pageReady, setPageReady] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    { authUserAction, oAuthUserAction, setAuthSlideTextAction, removeErrorAction } = props,
    [password, setPassword] = useState(process.env.NODE_ENV !== "production" ? "666666c" : ""),
    [email, setEmail] = useState(process.env.NODE_ENV !== "production" ? "maduekwepedro@gmail.com" : "");

  useEffect(() => {
    setPageReady(true);
    if (!pageReady) {
      setAuthSlideTextAction("signin");

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const token = urlParams.get("token");
      const email = deObfuscate(urlParams.get("rstd"));

      if (token === "verify") {
        return enqueueSnackbar(
          `Your eMail has not been verified, A new mail has been sent to ${email}, Kindly click on the verification link`,
          { variant: "warning" }
        );
      }
      if (token === "failed") {
        return enqueueSnackbar(`${email} is not registered with SoccerMASS; Click the Signup button to register`, {
          variant: "error",
        });
      }
      if (!!token) return oAuthUserAction(token);
    }
  }, []);

  useEffect(() => {
    if (pageReady && props.error) {
      for (const err of props.error) {
        // if (err === "MISSING_TOKEN") return enqueueSnackbar(`Missing Token`, { variant: "error" });
        if (err === "SUSPICIOUS_TOKEN") return enqueueSnackbar(`Suspicious token received`, { variant: "error" });
        if (err === "SERVER_NOT_REACHABLE") return enqueueSnackbar(`Temporary server error`, { variant: "error" });
        if (err === "INVALID_EMAIL/PASSWORD") return enqueueSnackbar(`Incorrect Email/Password`, { variant: "error" });
        if (err === "EMAIL_NOT_VERIFIED")
          return enqueueSnackbar(`A new mail has been sent to ${email}, Kindly click on the verification link`, {
            variant: "warning",
          });
      }
      removeErrorAction("all");
    }
  }, [props.error[0]]);

  useEffect(() => props.auth.club && Router.push("/"), [props.auth]);

  const submitForm = async () => {
    setLoading(true);
    if (validate("email", email) && validate("password", password)) {
      authUserAction({ email, password });
    } else {
      enqueueSnackbar(`Incorrect Email/Password`, { variant: "warning" });
    }
    await sleep(1);
    setLoading(false);
  };

  return <Signin {...{ email, loading, setEmail, password, submitForm, setPassword, showPassword, setShowPassword }} />;
};

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.profile.auth,
});

const mapDispatchToProps = {
  authUserAction,
  oAuthUserAction,
  removeErrorAction,
  setAuthSlideTextAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
