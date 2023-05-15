import { EnqueueSnackbar } from "notistack";

type ResetFormOptions = { loading: boolean };
type ResetFormEmail = { value: string; valid: boolean; info: string };

export interface ForgotPasswordForm {
  email: ResetFormEmail;
  options: ResetFormOptions;
}

export interface ForgotPassword {
  onInputChange: Function;
  form: ForgotPasswordForm;
  resetPasswordHandler: Function;
}

export interface ForgotPasswordOnInputChange {
  setForm: Function;
  enqueueSnackbar: EnqueueSnackbar;
  closeSnackbar: Function;
  e: React.FocusEvent<HTMLInputElement>;
}

export interface ForgotPasswordHandler {
  form: ForgotPasswordForm;
  setForm: Function;
  enqueueSnackbar: EnqueueSnackbar;
}
