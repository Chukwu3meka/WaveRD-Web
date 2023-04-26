import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin, handlers } from ".";
import { setAuthAction } from "@store/actions";
import { ISigninContainer, IUserForm } from "@interface/accounts/signin-interface";
import { deObfuscate } from "@utils/handlers";

const SigninContainer = (props: ISigninContainer) => {
  const router = useRouter(),
    { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [iconOnly, setIconOnly] = useState<boolean>(true),
    [userForm, setUserForm] = useState<IUserForm>({
      password: "",
      email: "",
      options: { showPassword: false, loading: false },
    });

  useEffect(() => {
    const { facebook, twitter, google, response } = router.query;
    const urlResponse = deObfuscate(decodeURIComponent(response as string));
    if (facebook || twitter || google) enqueueSnackbar(urlResponse, { variant: "error" }) && router.replace("/accounts/signin");
  }, []);

  useEffect(() => {
    setIconOnly((props.deviceWidth || window.innerWidth) < 460);
  }, [props.deviceWidth]);

  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });
  const loginHandler = () => () => handlers.loginHandler({ setUserForm, userForm, enqueueSnackbar, setAuthAction });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status, deviceWidth: state.layout.deviceWidth }),
  mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
