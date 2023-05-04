import { useState } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { ForgotPassword, handlers } from ".";
import { logoutAction } from "@store/actions";

const ForgotPasswordContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    options: { loading: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });

  return <ForgotPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
