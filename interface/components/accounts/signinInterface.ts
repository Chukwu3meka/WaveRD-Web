import { SetAuthAction } from "@interface/store/auth";

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
  userForm: UserForm;
  setUserForm: Function;
  setAuthAction: (SetAuthAction) => void;
  enqueueSnackbar: Function;
}

export interface Social {
  iconOnly: boolean;
}
