import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, Success } from ".";
import { UserForm } from "@interface/components/accounts/signupInterface";

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<UserForm>({
    options: { showPassword: false, loading: false, accountCreated: false },
    email: { value: "", valid: true, info: "Email cannot be empty" },
    fullName: { value: "", valid: true, info: "Full Name cannot be empty" },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
  });

  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm, closeSnackbar });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur: true });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur: false });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return userForm.options.accountCreated ? <Success /> : <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }} />;
};

export default SignupContainer;
