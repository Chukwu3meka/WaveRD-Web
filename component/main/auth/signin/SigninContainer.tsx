import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Signin, handlers } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
// import {  } from "./signinMethods";
import Router from "next/router";
import validateInput from "@utils/validator";
// import { any, any } from "@interface/components/siginin-interface";

// import { logoutAction } from "@store/actions";

const SigninContainer = (props: any) => {
  // const signinFormMouseMoveCapture = handlers.signinFormMouseMoveCapture;

  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_EMAIL as string) : "",
    password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_PASSWORD as string) : "",
  });

  useEffect(() => {
    console.log("useEffect");
  }, []);

  const [formError, setFormError] = useState<any>({
    status: false,
    email: "pristine",
    password: "pristine",
    errorMessages: "Email && Password cannot be empty",
  });

  const handleChange = (prop: "email" | "password") => (event: any) => {
    event.preventDefault();

    return setValues({ ...values, [prop]: event.target.value });
    setValues({ ...values, [prop]: event.target.value });

    function isNumeric(number: number) {
      const value = parseInt(`${number}`);

      if (typeof value !== "number") return false; // we only process strings!
      return (
        !isNaN(value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(`${value}`))
      ); // ...and ensure strings of whitespace fail
    }

    const value = event.target.value;

    let errorMessage: string | null;

    // switch (prop) {
    //   case "email": {
    //     setValues({ ...values, email: value.toLowerCase() });

    //     const validInput = validateInput({ type: prop, value, label: "Email" });

    //     if (validInput) {
    //       errorMessage = null;
    //     } else if (value.length < 0) {
    //       errorMessage = `${prop} cannot be empty`;
    //     } else if (!value.endsWith("@zenithbank.com")) {
    //       errorMessage = `${prop} must end with '@zenithbank.com'`;
    //     } else {
    //       errorMessage = `${prop} is required and can only contain 'Alphanumeric', 'Underscore', 'Hyphen' and 'Dot'`;
    //     }

    //     setFormError((values: any) => ({ ...values, email: errorMessage === null ? 1 : -1, errorMessages: errorMessage }));

    //     break;
    //   }
    //   case "password":
    //     const newValue = isNumeric(value) ? parseInt(value) : null;

    //     if (newValue) {
    //       setValues({ ...values, password: `${newValue}` });

    //       const validInput = validateInput(prop, newValue);

    //       if (validInput) {
    //         errorMessage = null;
    //       } else if (`${newValue}`.length !== 10) {
    //         errorMessage = `${prop} must have ten(10) characters`;
    //       } else {
    //         errorMessage = `${prop} should only have numbers`;
    //       }

    //       setFormError((values: any) => ({ ...values, password: errorMessage === null ? 1 : -1, errorMessages: errorMessage }));
    //       break;
    //     }

    //   default:
    //     break;
    // }

    setFormError((values: any) => ({ ...values, status: values.email === "valid" && values.password === "valid" ? false : true }));
  };

  const handleFocus = (prop: string) => () => {
    return;
    // const validInput = formError[prop] === 1 ? true : false;
    // if (!validInput) enqueueSnackbar(formError.errorMessages, { variant: "error" });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const loginHandler = async () => {
    setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

    const { email, password } = values;
    const notificationResponse = { variant: "", message: "" };
    const basicAuth = Buffer.from(`${email}:${password}`).toString("base64"); // (Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
    // await services
    //   .signin({ basicAuth })
    //   .then(() => {
    //     console.log("success");
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });

    // await fetch("http://172.29.72.18/travels/api/partner/email/msg?status=FAILED")
    //   .then(async (response) => {
    //     if (!response.ok) throw await response.json();
    //     const a = await response.json();
    //     console.log({ response: a });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // throw err;

    // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/partner/email/msg?status=FAILED`);

    // console.log(data);

    // await apiFetcher({ endpoint: "/partner/bookings", basicAuth })
    //   ?.then((res) => {
    //     if (!res) notificationResponse.variant = "Invalid Server Response, Kindly try again later";
    //     notificationResponse.variant = "success";
    //   })
    //   .catch((err) => {
    //     notificationResponse.variant = "error";
    //     if (err.message === "Failed to fetch") {
    //       notificationResponse.message = "Server can't be reached, Kindly try again later";
    //     } else {
    //       notificationResponse.message = "Invalid Username/Password";
    //     }
    //   });

    // await fetcher("/auth/signin", { basicAuth })
    //   .then((res) => {
    //     if (res.status !== "success") notificationResponse.variant = "Invalid Server Response, Kindly try again later";
    //     notificationResponse.variant = "success";
    //   })
    //   .catch((err) => {
    //     notificationResponse.variant = "error";
    //     if (err.message === "Failed to fetch") {
    //       notificationResponse.message = "Server can't be reached, Kindly try again later";
    //     } else {
    //       notificationResponse.message = "Invalid Username/Password";
    //     }
    //   });

    if (notificationResponse.variant === "success") {
      const authPersist = () => {
        setAuthAction({ email, basicAuth });
        enqueueSnackbar("Signed in successfully", { variant: "success" });
      };

      if (Router.asPath !== "/") {
        await sleep(1);
        Router.push("/").finally(() => authPersist());
      } else {
        authPersist();
      }
    } else {
      await sleep(0.5);
      setValues((values: any) => ({ ...values, buttonLoading: false })); // activate botton loading
      enqueueSnackbar(notificationResponse.message, { variant: "error" });
    }
    setValues((values: any) => ({ ...values, buttonLoading: false })); // activate botton loading
  };

  // return <header>saas</header>;

  return <Signin {...{ handleChange, handleClickShowPassword, values, formError, loginHandler, handleFocus }} />;
  // return <Signin {...{ signinFormMouseMoveCapture, handleChange, handleClickShowPassword, values, formError, loginHandler, handleFocus }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = {
    //
    // logoutAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
