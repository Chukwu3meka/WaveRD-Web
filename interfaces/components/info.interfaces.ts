import { EnqueueSnackbar } from "notistack";
import { SelectChangeEvent } from "@mui/material/Select";
import { CONTACT_PREFERENCE } from "utils/constants";

export interface Categories {
  value: string;
  label: string;
}

export interface ContactUS {
  sectionHandler: Function;
  contactPreference: typeof CONTACT_PREFERENCE;
  contactPrefHandler: Function;
  categories: Categories[];
  submitHandler: Function;
  categoryRef: React.Ref<any>;
  userForm: UserForm;
  onInputChange: Function;
}

export interface UserForm {
  options: UserFormOptions;
  name: UserFormValuesData;
  contact: UserFormValuesData;
  comment: UserFormValuesData;
}

type UserFormValuesData = { info: string; value: string; valid: boolean; validate: boolean };

interface UserFormOptions {
  section: string;
  loading: boolean;
  contact: "email" | "whatsapp";
  validate: boolean;
  category: string;
}

export interface ContactPrefHandler {
  e: SelectChangeEvent;
  userForm: UserForm;
  contactPreference: typeof CONTACT_PREFERENCE;
  setUserForm: Function;
  enqueueSnackbar: EnqueueSnackbar;
  closeSnackbar: Function;
}

export interface OnInputChange {
  e: React.FocusEvent<HTMLInputElement>;
  contactPreference: typeof CONTACT_PREFERENCE;
  setUserForm: Function;
  enqueueSnackbar: EnqueueSnackbar;
  userForm: UserForm;
  closeSnackbar: Function;
  onBlur: boolean;
}

export interface SubmitHandler {
  enqueueSnackbar: EnqueueSnackbar;
  setUserForm: Function;
  userForm: UserForm;
  contactPreference: typeof CONTACT_PREFERENCE;
  categories: Categories[];
}
