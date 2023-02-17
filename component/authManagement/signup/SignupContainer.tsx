import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, ConfirmMail } from ".";

const SignupContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState({
    options: { showPassword: false, loading: false, accountCreated: false },
    handle: { value: "Chukwu3meka", valid: true, info: "Handle cannot be empty" },
    password: { value: "Password@1", valid: true, info: "Password cannot be empty" },
    email: { value: "chukwuemeka@soccermass.com", valid: true, info: "Email cannot be empty" },
    fullName: { value: "Chukwuemeka Maduekwe", valid: true, info: "Full Name cannot be empty" },
  });

  const [values, setValues] = useState<any>({ showPassword: false, buttonLoading: false, email: "", handle: "", password: "", fullName: "" });

  const [formStatus, setFormStatus] = useState<any>({
    email: { valid: true, message: "Email cannot be empty" },
    handle: { valid: true, message: "Handle cannot be empty" },
    password: { valid: true, message: "Password cannot be empty" },
    fullName: { valid: true, message: "Full Name cannot be empty" },
  }); // <= STATUS: valid, invalid, loading

  const [currentError, setCurrentError] = useState(null);

  const handleClickShowPassword = () => setUserForm({ ...values, showPassword: !values.showPassword });
  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onBlurHandler({ e, setUserForm });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });

  return <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, currentError, onBlurHandler }} />;
};

export default SignupContainer;
