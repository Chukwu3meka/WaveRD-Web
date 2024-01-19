// "use client";

import { useRouter } from "next/navigation";
// import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin } from ".";
import { UserForm } from "interfaces/components/accounts.interfaces";
import { useStoreContext } from "components/providers/StoreContext";
import { deObfuscate, sleep } from "utils/helpers";
import validator from "utils/validator";
// import { deObfuscate } from "@utils/handlers";
// // import { connector, ConnectorProps } from "@store";

// import { SigninContainer as SigninContainerInterface, UserForm } from "@interface/components/accounts/signinInterface";

// import fetcher from "@utils/fetcher";
// import validator from "@utils/validator";
// import { capitalize, sleep } from "@utils/handlers";

// import { LoginHandler, OnInputChange } from "@interface/components/accounts/signinInterface";
// import { setDetails } from "store/actions";
// import { connect } from "react-redux";

const defaultFormValues: UserForm = { password: "", email: "", options: { showPassword: false, loading: false } };

// export default connector((props: SigninContainer & ConnectorProps) => {
const SigninContainer = () => {
  const router = useRouter(),
    { setDetails, authenticated } = useStoreContext().user,
    { deviceSize } = useStoreContext().layout,
    { setMessage } = useStoreContext().snackbar,
    [iconOnly, setIconOnly] = useState(true),
    // [authenticated, setAuthenticated] = useState(false),
    [userForm, setUserForm] = useState(defaultFormValues);

  useEffect(() => {
    setMessage("error occured");
    // // Handle Social oAuth
    // const { facebook, twitter, google, response } = router.query;
    // const urlResponse = deObfuscate(decodeURIComponent(response as string));
    // if (facebook || twitter || google) {
    //   // setMessage(urlResponse, { variant: "error" })
    //   //  router.replace("/accounts/signin");
    // }
  }, []);

  // useEffect(() => {
  //   setAuthenticated(!!props.auth);
  // }, [props.auth]);

  useEffect(() => {
    setIconOnly(deviceSize.width < 460);
  }, [deviceSize.width]);

  const loginHandler = async () => {
    const email = userForm.email.trim(),
      password = userForm.password;

    // if (!email.trim()) return setMessage(`Email cannot be empty`, { variant: "error" });
    // if (!password) return setMessage(`Email cannot be empty`, { variant: "error" });

    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const disableLoading = () => setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));

    try {
      validator({ value: email, type: "email" });
      validator({ value: password, type: "password" });

      // await fetcher({ method: "POST", endpoint: "/accounts/signin", data: { email, password } })
      //   .then(async ({ data: { role, fullName, handle, cookieConsent } }) => {
      //     const redirectTarget = router.query && router.query.redirect;

      //     setDetails({ role, fullName, handle, cookieConsent });
      //     // setMessage("Authenticated Successfully", { variant: "success" });

      //     if (redirectTarget && typeof redirectTarget === "string") return router.push(redirectTarget);

      //     router.push("/");
      //   })
      //   .catch(async ({ message }) => {
      //     await sleep(0.2);
      //     // setMessage(message || "Invalid Email/Password", { variant: "error" });
      //   })
      //   .finally(() => disableLoading());
    } catch (error) {
      await sleep(0.2);
      disableLoading();
      // setMessage("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
    }
  };

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserForm((userForm: any) => ({ ...userForm, [id]: value }));
  };

  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly, authenticated }} />;
};

export default SigninContainer;
