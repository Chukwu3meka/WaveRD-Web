import { Validator } from "interfaces/utils/validator.interface";
import { ChangeEventHandler, MouseEventHandler } from "react";

export interface SigninProps {
  userForm: SigninForm;
  iconOnly: boolean;
  authenticated: boolean;
  loginHandler: MouseEventHandler<HTMLButtonElement>;
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
  onInputChange: Function;
  userForm: SignupForm;
  handleClickShowPassword: Function;
  onBlurHandler: Function;
  registerHandler: Function;
}

export interface SignupForm {
  options: SignupFormOptions;
  email: SignupFormValue;
  handle: SignupFormValue;
  password: SignupFormValue;
  fullName: SignupFormValue;
}

export type SigninFormKeys = "email" | "handle" | "password" | "fullName" | "options";

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

type ResetFormOptions = { loading: boolean; showPassword: boolean };
type ResetFormvalue = { value: string; valid: boolean; info: string };
// type ResetFormvalue = { value: string; valid: boolean; info: string; validating: boolean };

export interface ResetForm {
  email: ResetFormvalue;
  password: ResetFormvalue;
  options: ResetFormOptions;
}

export type ResetFormKeys = "email" | "password" | "options";

export interface ResetPasswordProp {
  form: ResetForm;
  onInputChange: Function;
  resetPasswordHandler: Function;
  handleClickShowPassword: Function;
}
