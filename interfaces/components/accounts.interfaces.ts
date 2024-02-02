import { Validator } from "interfaces/utils/validator.interface";
import { ChangeEventHandler, MouseEventHandler } from "react";

export interface SigninProps {
  iconOnly: boolean;
  userForm: SigninForm;
  authenticated: boolean;
  loginHandler: Function;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  handleClickShowPassword: MouseEventHandler<HTMLButtonElement>;
}

export interface SigninForm {
  email: string;
  password: string;
  options: SigninFormOptions;
}

interface SigninFormOptions {
  loading: boolean;
  showPassword: boolean;
}

export interface SocialSignin {
  iconOnly: boolean;
}

export interface SignupProps {
  userForm: SignupForm;
  onChangeHandler: Function;
  registerHandler: Function;
  handleClickShowPassword: Function;
}

export interface SignupForm {
  options: SignupFormOptions;
  email: SignupFormValue;
  handle: SignupFormValue;
  password: SignupFormValue;
  name: SignupFormValue;
}

export type SigninFormKeys = "email" | "handle" | "password" | "name" | "options";

type SignupFormValue = { info: string; value: string; valid: boolean; validating?: boolean };

interface SignupFormOptions {
  loading: boolean;
  showPassword: boolean;
  accountCreated: boolean;
}

export interface ValidateFormEntry {
  id: Validator["type"];
  value: string;
  setUserForm: Function;
}

type ResetFormOptions = { loading: boolean; showPassword?: boolean };
type ResetFormValue = { value: string; valid: boolean; info: string };
// type ResetFormValue = { value: string; valid: boolean; info: string; validating: boolean };

export interface ResetForm {
  email: ResetFormValue;
  password: ResetFormValue;
  options: ResetFormOptions;
}

export type ResetFormKeys = "email" | "password" | "options";

export interface ResetPasswordProp {
  form: ResetForm;
  onInputChange: Function;
  resetPasswordHandler: Function;
  handleClickShowPassword: Function;
}

export interface ForgotPasswordForm {
  email: ResetFormValue;
  options: ResetFormOptions;
}

export interface ForgotPasswordProps {
  onInputChange: Function;
  form: ForgotPasswordForm;
  resetPasswordHandler: Function;
}

export interface ConfirmPasswordResetContainerProps {
  gear: string;
}

// export interface ForgotPasswordOnInputChange {
//   setForm: Function;
//   enqueueSnackbar: EnqueueSnackbar;
//   closeSnackbar: Function;
//   e: React.FocusEvent<HTMLInputElement>;
// }

// export interface ForgotPasswordHandler {
//   form: ForgotPasswordForm;
//   setForm: Function;
//   enqueueSnackbar: EnqueueSnackbar;
// }
