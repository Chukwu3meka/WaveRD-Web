import { Validator } from "@interface/utils/validatorInterface";

export interface DataDeletion {
  onInputChange: Function;
  userForm: UserForm;
  handleClickShowPassword: Function;
  onBlurHandler: Function;
  deleteDataHandler: Function;
  authenticated: boolean;
}

export interface UserForm {
  options: UserFormOptions;
  email: UserFormValuesData;
  handle: UserFormValuesData;
  password: UserFormValuesData;
  comment: UserFormValuesData;
}

type UserFormValuesData = { info: string; value: string; valid: boolean; validate: boolean };

interface UserFormOptions {
  loading: boolean;
  showPassword: boolean;
  validate: boolean;
}

export interface OnInputChange {
  enqueueSnackbar: Function;
  closeSnackbar: Function;
  e: React.FocusEvent<HTMLInputElement>;
  setUserForm: Function;
  onBlur: boolean;
}

export interface DeleteDataHandler {
  userForm: UserForm;
  setUserForm: Function;
  enqueueSnackbar: Function;
}
