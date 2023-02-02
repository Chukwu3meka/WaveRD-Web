import { connect } from "react-redux";

import { logoutAction } from "@store/actions";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, ConfirmMail } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
import Router from "next/router";

const SignupContainer = (props: any) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_EMAIL as string) : "",
    handle: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_HANDLE as string) : "",
    password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_PASSWORD as string) : "",
    fullName: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_FULL_NAME as string) : "",
  });

  const [formStatus, setFormStatus] = useState<any>({
    email: { status: "invalid", pristine: true, message: "Email cannot be empty" },
    handle: { status: "invalid", pristine: true, message: "Handle cannot be empty" },
    password: { status: "invalid", pristine: true, message: "Password cannot be empty" },
    fullName: { status: "invalid", pristine: true, message: "Full Name cannot be empty" },
  }); // <= STATUS: valid, invalid, loading

  const [currentError, setCurrentError] = useState(null);

  const registerHandler = () => handlers.registerHandler({ setValues, values, formStatus, enqueueSnackbar });
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setValues, setFormStatus, setCurrentError });

  return values.accountCreated ? (
    <ConfirmMail />
  ) : (
    <Signup {...{ onInputChange, handleClickShowPassword, values, formStatus, registerHandler, currentError }} />
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
