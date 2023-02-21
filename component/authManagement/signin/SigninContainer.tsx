import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin, handlers } from ".";
import { setAuthAction } from "@store/actions";
import { ISigninContainer, IUserForm } from "@interface/auth/signin-interface";
import fetcher from "@utils/fetcher";
import { deObfuscate } from "@utils/handlers";

const SigninContainer = (props: ISigninContainer) => {
  const router = useRouter(),
    { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<IUserForm>({
    password: "Password@1",
    email: "chukwuemeka@soccermass.com",
    options: { showPassword: false, loading: false },
  });

  useEffect(() => {
    const { facebook, twitter, google, response } = router.query;

    const urlResponse = deObfuscate(decodeURIComponent(response as string));
    if (facebook || twitter || google) enqueueSnackbar(urlResponse, { variant: "error" }) && router.replace("/auth/signin");
  }, []);

  // const oAuthLoginFn = () => handlers.oAuthLoginFn({ e, setUserForm });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });
  const loginHandler = () => () => handlers.loginHandler({ setUserForm, userForm, enqueueSnackbar, setAuthAction });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
