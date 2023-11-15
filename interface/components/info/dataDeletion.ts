import { EnqueueSnackbar } from "notistack";

export interface DataDeletion {
  onInputChange: Function;
  userForm: UserForm;
  handleClickShowPassword: Function;
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
