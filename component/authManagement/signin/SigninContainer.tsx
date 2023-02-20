import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin, handlers } from ".";
import { setAuthAction } from "@store/actions";
import { ISigninContainer } from "@interface/auth/signin-interface";

const SigninContainer = (props: ISigninContainer) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_EMAIL as string) : "",
    password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_PASSWORD as string) : "",
  });

  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange(e, setValues);
  const handleClickShowPassword = () => () => setValues({ ...values, showPassword: !values.showPassword });
  const loginHandler = () => () => handlers.loginHandler({ setValues, values, enqueueSnackbar, setAuthAction });

  return <Signin {...{ onInputChange, handleClickShowPassword, values, loginHandler }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
