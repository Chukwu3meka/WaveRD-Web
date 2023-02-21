import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers } from ".";
import { IUserForm } from "@interface/auth/signup-interface";

const SignupContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<IUserForm>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    handle: { value: "", valid: true, info: "Handle cannot be empty" },
    password: { value: "", valid: true, info: "Password cannot be empty" },
    options: { showPassword: false, loading: false, accountCreated: false },
    fullName: { value: "", valid: true, info: "Full Name cannot be empty" },
  });

  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onBlurHandler({ e, setUserForm });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }} />;
};

export default SignupContainer;
