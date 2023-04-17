import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers } from ".";
import { IUserForm } from "@interface/auth/signup-interface";

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<IUserForm>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    fullName: { value: "", valid: true, info: "Full Name cannot be empty" },
    options: { showPassword: false, loading: false, accountCreated: false },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
  });

  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler }} />;
};

export default SignupContainer;
