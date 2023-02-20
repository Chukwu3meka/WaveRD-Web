import { IValidator } from "@interface/utils/validator-interface";

export interface ISignup {
  onInputChange: Function;
  userForm: IUserForm;
  handleClickShowPassword: Function;
  registerHandler: Function;
  onBlurHandler: Function;
}

export interface IUserForm extends IUserFormValues {
  options: IUserFormOptions;
}

export interface IUserFormValues {
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

interface IUserFormValuesData {
  info: string;
  value: string;
  valid: boolean;
}

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
