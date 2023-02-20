import { IValidator } from "@interface/utils/validator-interface";

export interface ISignup {
  onInputChange: Function;
  userForm: IUserForm;
  handleClickShowPassword: Function;
  registerHandler: Function;
  onBlurHandler: Function;
}

export interface IUserForm {
  options: IUserFormOptions;
  email: IUserFormValuesData;
  handle: IUserFormValuesData;
  password: IUserFormValuesData;
  fullName: IUserFormValuesData;
}

interface IUserFormOptions {
  loading: boolean;
  showPassword: boolean;
  accountCreated: boolean;
}

type IUserFormValuesData = { info: string; value: string; valid: boolean };

export interface IValidateFormEntry {
  id: IValidator["type"];
  value: string;
  setUserForm: Function;
}

export interface IOnInputChange {
  e: React.FocusEvent<HTMLInputElement>;
  setUserForm: Function;
}

export interface IRegisterHandler {
  enqueueSnackbar: Function;
  setUserForm: Function;
  userForm: IUserForm;
}
