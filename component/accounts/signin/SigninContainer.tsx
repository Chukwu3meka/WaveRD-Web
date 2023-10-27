import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin } from ".";
import { deObfuscate } from "@utils/handlers";
// import { connector, ConnectorProps } from "@store";

import { SigninContainer as SigninContainerInterface, UserForm } from "@interface/components/accounts/signinInterface";

import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { capitalize, sleep } from "@utils/handlers";

import { LoginHandler, OnInputChange } from "@interface/components/accounts/signinInterface";
import { setAuthAction } from "store/actions";
import { connect } from "react-redux";

const defaultFormValues: UserForm = { password: "", email: "", options: { showPassword: false, loading: false } };

// export default connector((props: SigninContainer & ConnectorProps) => {
const SigninContainer = (props: SigninContainerInterface) => {
  const router = useRouter(),
    { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [iconOnly, setIconOnly] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    [userForm, setUserForm] = useState(defaultFormValues);

  useEffect(() => {
    // Handle Social oAuth
    const { facebook, twitter, google, response } = router.query;
    const urlResponse = deObfuscate(decodeURIComponent(response as string));
    if (facebook || twitter || google) enqueueSnackbar(urlResponse, { variant: "error" }) && router.replace("/accounts/signin");
  }, []);

  useEffect(() => {
    setAuthenticated(!!props.auth);
  }, [props.auth]);

  useEffect(() => {
    setIconOnly(props.deviceWidth < 460);
  }, [props.deviceWidth]);

  const loginHandler = async () => {
    const email = userForm.email.trim(),
      password = userForm.password;

    if (!email.trim()) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });
    if (!password) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });

    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const disableLoading = () => setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));

    try {
      validator({ value: email, type: "email" });
      validator({ value: password, type: "password" });

      await fetcher({ method: "POST", endpoint: "/accounts/signin", data: { email, password } })
        .then(async ({ data: { role, fullName, handle, cookieConsent } }) => {
          const redirectTarget = router.query && router.query.redirect;

          setAuthAction({ role, fullName, handle, cookieConsent });
          enqueueSnackbar("Authenticated Successfully", { variant: "success" });

          if (redirectTarget && typeof redirectTarget === "string") return router.push(redirectTarget);

          router.push("/");
        })
        .catch(async ({ message }) => {
          await sleep(0.2);
          enqueueSnackbar(message || "Invalid Email/Password", { variant: "error" });
        })
        .finally(() => disableLoading());
    } catch (error) {
      await sleep(0.2);
      disableLoading();
      enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
    }
  };

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserForm((userForm: any) => ({ ...userForm, [id]: value }));
  };

  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly, authenticated }} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  deviceWidth: state.layout.width,
});

const mapDispatchToProps = { setAuthAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
