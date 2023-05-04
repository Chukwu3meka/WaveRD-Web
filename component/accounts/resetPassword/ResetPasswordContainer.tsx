import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { ResetPassword, handlers, InvalidLink } from ".";
import { ResetForm } from "@interface/accounts/resetPassword-interface";

const ResetPasswordContainer = () => {
  const router = useRouter(),
    gear = (router.query.gear as string) || "", //  gear in reset email
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (!gear) return <InvalidLink />;

  const [form, setForm] = useState<ResetForm>({
    options: { showPassword: false, loading: false },
    email: { value: "", valid: true, info: "Email cannot be empty" },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, gear, router });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });
  const handleClickShowPassword = () => setForm((values: any) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return (
    <ResetPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} handleClickShowPassword={handleClickShowPassword} />
  );
};

export default ResetPasswordContainer;
