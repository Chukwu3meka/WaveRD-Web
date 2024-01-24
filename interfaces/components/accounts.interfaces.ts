import { ChangeEventHandler, MouseEventHandler } from "react";

export interface Signin {
  userForm: UserForm;
  iconOnly: boolean;
  authenticated: boolean;
  loginHandler: MouseEventHandler<HTMLButtonElement>;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  handleClickShowPassword: MouseEventHandler<HTMLButtonElement>;
}

export interface UserForm {
  email: string;
  password: string;
  options: UserFormOptions;
}

interface UserFormOptions {
  loading: boolean;
  showPassword: boolean;
}

export interface SocialSignin {
  iconOnly: boolean;
}
