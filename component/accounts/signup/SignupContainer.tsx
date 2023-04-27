import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, Success } from ".";
import { IUserForm } from "@interface/accounts/signup-interface";

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<IUserForm>({
    options: { showPassword: false, loading: false, accountCreated: false },
    email: { value: "chukwuemeka@soccermass.com", valid: true, info: "Email cannot be empty" },
    fullName: { value: "Chukwuemeka Maduekwe", valid: true, info: "Full Name cannot be empty" },
    handle: { value: "Chukwu3meka", valid: true, info: "Handle cannot be empty", validating: false },
    password: { value: "Password@1", valid: true, info: "Password cannot be empty", validating: false },
  });

  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return userForm.options.accountCreated ? <Success /> : <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler }} />;
};

export default SignupContainer;
