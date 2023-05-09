import { SetAuthAction } from "@interface/store/auth";

export interface ISignin {
  userForm: IUserForm;
  loginHandler: Function;
  onInputChange: Function;
  handleClickShowPassword: Function;
  iconOnly: boolean;
}

export interface ISigninContainer {
  deviceWidth: number;
}

export interface IUserForm {
  email: string;
  password: string;
  options: IUserFormOptions;
}

interface IUserFormOptions {
  loading: boolean;
  showPassword: boolean;
}

export interface IOnInputChange {
  setUserForm: Function;
  e: React.FocusEvent<HTMLInputElement>;
}

export interface LoginHandler {
  userForm: IUserForm;
  setUserForm: Function;
  setAuthAction: (SetAuthAction) => void;
  enqueueSnackbar: Function;
}

export interface Social {
  iconOnly: boolean;
}
