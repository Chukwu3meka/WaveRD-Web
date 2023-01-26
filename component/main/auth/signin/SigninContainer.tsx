import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin, handlers } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
import Router from "next/router";
import validateInput from "@utils/validator";
// import { any, any } from "@interface/components/siginin-interface";

// import { logoutAction } from "@store/actions";

const SigninContainer = (props: any) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_EMAIL as string) : "",
    password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_PASSWORD as string) : "",
  });

  const [formError, setFormError] = useState<any>({
    status: false,
    email: "pristine",
    password: "pristine",
    errorMessages: "Email && Password cannot be empty",
  });

  const signinFormMouseMoveCapture = handlers.signinFormMouseMoveCapture;
  const loginHandler = () => handlers.loginHandler({ setValues, values });
  const handleInputFocus = handlers.handleInputFocus;
  // const handleChange =(e,value) handlers.handleChange;
  const handleChange = handlers.handleChange;
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  return <Signin {...{ signinFormMouseMoveCapture, handleChange, handleClickShowPassword, values, formError, loginHandler, handleInputFocus }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = {
    //
    // logoutAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
