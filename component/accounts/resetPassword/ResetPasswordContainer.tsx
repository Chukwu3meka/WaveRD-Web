import { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { ResetPassword, handlers } from ".";
import { logoutAction } from "@store/actions";

const ResetPasswordContainer = (props: any) => {
  const router = useRouter(),
    { gear } = router.query, //  gear in reset email
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (!gear) {
    enqueueSnackbar("Invalid Password reset link", { variant: "error" });
    setTimeout(() => router.push("/accounts/forgot-password"), 5000);
  }

  const [form, setForm] = useState<any>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    options: { showPassword: false, loading: false, accountCreated: false },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, gear, router });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });
  const handleClickShowPassword = () => setForm((values: any) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return (
    <ResetPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} handleClickShowPassword={handleClickShowPassword} />
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
