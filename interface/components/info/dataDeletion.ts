import { Validator } from "@interface/utils/validatorInterface";

// export interface Signup {
//   onInputChange: Function;
//   userForm: UserForm;
//   handleClickShowPassword: Function;
//   onBlurHandler: Function;
//   registerHandler: Function;
// }

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

export interface DeleteDataHandler {
  userForm: UserForm;
  setUserForm: Function;
  enqueueSnackbar: Function;
}
