import { useState } from "react";
import { useSnackbar } from "notistack";

import { ForgotPassword, handlers } from ".";
import { ForgotPasswordForm } from "@interface/components/accounts/forgotPasswordInterface";

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<ForgotPasswordForm>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    options: { loading: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });

  return <ForgotPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} />;
};
