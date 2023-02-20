import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin, handlers } from ".";
import { setAuthAction } from "@store/actions";
import { ISigninContainer, IUserForm } from "@interface/auth/signin-interface";

const SigninContainer = (props: ISigninContainer) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<IUserForm>({
    password: "Password@1",
    email: "chukwuemeka@soccermass.com",
    options: { showPassword: false, loading: false },
  });

  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });
  const loginHandler = () => () => handlers.loginHandler({ setUserForm, userForm, enqueueSnackbar, setAuthAction });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onBlurHandler({ e, setUserForm });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, showPassword: !values.options.showPassword }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
