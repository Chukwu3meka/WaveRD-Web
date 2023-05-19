import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin, handlers } from ".";
import { deObfuscate } from "@utils/handlers";
import { connector, ConnectorProps } from "@store";

import { SigninContainer, UserForm } from "@interface/components/accounts/signinInterface";

export default connector((props: SigninContainer & ConnectorProps) => {
  const router = useRouter(),
    { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [iconOnly, setIconOnly] = useState<boolean>(true),
    [userForm, setUserForm] = useState<UserForm>({
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
    setIconOnly(props.layout.width < 460);
  }, [props.layout.width]);

  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });
  const loginHandler = () => handlers.loginHandler({ setUserForm, userForm, enqueueSnackbar, setAuthAction, router });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly }} />;
});
