import { connect } from "react-redux";

import { ResetPassword, handlers } from ".";
import { logoutAction } from "@store/actions";

import ComingSoon from "@component/builder/comingSoon";
import { useState } from "react";

import { useSnackbar } from "notistack";

const ResetPasswordContainer = (props: any) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({
    options: { showPassword: false, loading: false, accountCreated: false },
  });

  const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setForm, enqueueSnackbar, closeSnackbar });

  return process.env.NODE_ENV === "production" ? (
    <ComingSoon />
  ) : (
    <ResetPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} />
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
