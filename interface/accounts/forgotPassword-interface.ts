import { NextRouter } from "next/router";

type ResetFormOptions = { loading: boolean; showPassword: boolean };
type ResetFormEmail = { value: string; valid: boolean; info: string };
type ResetFormPassword = { value: string; valid: boolean; info: string; validating: boolean };

export interface ResetForm {
  email: ResetFormEmail;
  password: ResetFormPassword;
  options: ResetFormOptions;
}

export interface ResetPassword {
  form: ResetForm;
  onInputChange: Function;
  resetPasswordHandler: Function;
  handleClickShowPassword: Function;
}

export interface ResetPasswordOnInputChange {
  setForm: Function;
  enqueueSnackbar: Function;
  closeSnackbar: Function;
  e: React.FocusEvent<HTMLInputElement>;
}

export interface ResetPasswordHandler {
  gear: string;
  form: ResetForm;
  router: NextRouter;
  setForm: Function;
  enqueueSnackbar: Function;
}
