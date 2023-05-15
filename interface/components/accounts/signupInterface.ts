import { Validator } from "@interface/utils/validatorInterface";

export interface Signup {
  onInputChange: Function;
  userForm: UserForm;
  handleClickShowPassword: Function;
  onBlurHandler: Function;
  registerHandler: Function;
}

export interface UserForm {
  options: UserFormOptions;
  email: UserFormValuesData;
  handle: UserFormValuesData;
  password: UserFormValuesData;
  fullName: UserFormValuesData;
}

interface UserFormOptions {
  loading: boolean;
  showPassword: boolean;
  accountCreated: boolean;
}

type UserFormValuesData = { info: string; value: string; valid: boolean; validating?: false };

export interface ValidateFormEntry {
  id: Validator["type"];
  value: string;
  setUserForm: Function;
}

export interface OnInputChange {
  enqueueSnackbar: Function;
  closeSnackbar: Function;
  e: React.FocusEvent<HTMLInputElement>;
  setUserForm: Function;
  onBlur: boolean;
}

export interface RegisterHandler {
  enqueueSnackbar: Function;
  closeSnackbar: Function;
  setUserForm: Function;
  userForm: UserForm;
}
