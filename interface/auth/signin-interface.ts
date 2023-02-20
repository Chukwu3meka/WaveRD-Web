export interface ISignin {
  userForm: IUserForm;
  loginHandler: Function;
  onInputChange: Function;
  handleClickShowPassword: Function;
}

export interface ISigninContainer {
  setAuthAction: Function;
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

export interface ILoginHandler {
  userForm: IUserForm;
  setUserForm: Function;
  setAuthAction: Function;
  enqueueSnackbar: Function;
}
