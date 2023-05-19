import { EnqueueSnackbar } from "notistack";

import { SetAuthAction } from "@interface/store/auth";
import { NextRouter } from "next/router";

export interface Signin {
  userForm: UserForm;
  loginHandler: Function;
  onInputChange: Function;
  handleClickShowPassword: Function;
  iconOnly: boolean;
}

export interface SigninContainer {
  deviceWidth: number;
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

export interface OnInputChange {
  setUserForm: Function;
  e: React.FocusEvent<HTMLInputElement>;
}

export interface LoginHandler {
  router: NextRouter;
  userForm: UserForm;
  setUserForm: Function;
  setAuthAction: (SetAuthAction) => void;
  enqueueSnackbar: EnqueueSnackbar;
}

export interface Social {
  iconOnly: boolean;
}
