import { useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers, ConfirmMail } from ".";

const SignupContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({ showPassword: false, buttonLoading: false, email: "", handle: "", password: "", fullName: "" });

  const [formStatus, setFormStatus] = useState<any>({
    email: { status: "invalid", pristine: true, message: "Email cannot be empty" },
    handle: { status: "invalid", pristine: true, message: "Handle cannot be empty" },
    password: { status: "invalid", pristine: true, message: "Password cannot be empty" },
    fullName: { status: "invalid", pristine: true, message: "Full Name cannot be empty" },
  }); // <= STATUS: valid, invalid, loading

  const [currentError, setCurrentError] = useState(null);

  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const registerHandler = () => handlers.registerHandler({ setValues, values, formStatus, enqueueSnackbar, setCurrentError });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onBlurHandler({ e, setValues, setFormStatus, setCurrentError });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setValues, setFormStatus, setCurrentError });

  return values.accountCreated ? (
    <ConfirmMail />
  ) : (
    <Signup {...{ onInputChange, handleClickShowPassword, values, formStatus, registerHandler, currentError, onBlurHandler }} />
  );
};

export default SignupContainer;
