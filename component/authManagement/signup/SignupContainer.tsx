import { connect } from "react-redux";

import { logoutAction } from "@store/actions";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, ConfirmMail } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
import Router from "next/router";

const devEnv = process.env.NODE_ENV === "development";

const SignupContainer = (props: any) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: devEnv ? (process.env.NEXT_PUBLIC_TEST_EMAIL as string) : "",
    handle: devEnv ? (process.env.NEXT_PUBLIC_TEST_HANDLE as string) : "",
    password: devEnv ? (process.env.NEXT_PUBLIC_TEST_PASSWORD as string) : "",
    fullName: devEnv ? (process.env.NEXT_PUBLIC_TEST_FULL_NAME as string) : "",
  });

  const [formStatus, setFormStatus] = useState<any>({
    email: { status: devEnv ? "valid" : "invalid", pristine: devEnv ? false : true, message: devEnv ? null : "Email cannot be empty" },
    handle: { status: devEnv ? "valid" : "invalid", pristine: devEnv ? false : true, message: devEnv ? null : "Handle cannot be empty" },
    password: { status: devEnv ? "valid" : "invalid", pristine: devEnv ? false : true, message: devEnv ? null : "Password cannot be empty" },
    fullName: { status: devEnv ? "valid" : "invalid", pristine: devEnv ? false : true, message: devEnv ? null : "Full Name cannot be empty" },
  }); // <= STATUS: valid, invalid, loading

  const [currentError, setCurrentError] = useState(null);

  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const registerHandler = () => handlers.registerHandler({ setValues, values, formStatus, enqueueSnackbar, setCurrentError });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onBlurHandler({ e, setValues, setFormStatus, setCurrentError });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setValues, setFormStatus, setCurrentError });

  return values.accountCreated ? (
    <ConfirmMail />
  ) : (
    <Signup {...{ onInputChange, handleClickShowPassword, values, formStatus, registerHandler, currentError, onBlurHandler }} />
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
