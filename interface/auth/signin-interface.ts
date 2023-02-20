export interface ISigninContainer {
  setAuthAction: Function;
}

export interface ISignin {
  onInputChange: Function;
  handleClickShowPassword: Function;
  values: any;
  loginHandler: Function;
}

export interface ILoginHandler {
  setValues: Function;
  values: any;
  enqueueSnackbar: any;
  setAuthAction: Function;
}
