import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { ForgotPassword, handlers } from ".";
import { logoutAction } from "@store/actions";
import ComingSoon from "@component/builder/comingSoon";

const ForgotPasswordContainer = (props: any) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    options: { showPassword: false, loading: false, accountCreated: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });

  return process.env.NODE_ENV === "production" ? (
    <ComingSoon header={false} minHeight="100%" />
  ) : (
    <ForgotPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} />
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
