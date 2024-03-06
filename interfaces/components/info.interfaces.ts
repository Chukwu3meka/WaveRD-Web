import { CONTACT_PREFERENCE } from "utils/constants";
import { ContactUsCategories } from "interfaces/utils/constants.interface";

type FormData = { info: string; value: string; valid: boolean; mandatory: boolean };
export interface CustomerUsForm {
  name: FormData;
  contact: FormData;
  comment: FormData;
  options: CustomerUsOptions;
}
export interface CustomerUsOptions {
  loading: boolean;
  category: string;
  contact: "email" | "whatsapp";
}

export interface ContactUS {
  sectionHandler: Function;
  contactPreference: typeof CONTACT_PREFERENCE;
  contactPrefHandler: Function;
  categories: ContactUsCategories[];
  submitHandler: Function;
  categoryRef: React.Ref<any>;
  userForm: CustomerUsForm;
  onInputChange: Function;
}

export interface DataDeletion {
  authenticated: boolean;
  onInputChange: Function;
  deleteDataHandler: Function;
  userForm: DataDeletionForm;
  handleClickShowPassword: Function;
}

export interface DataDeletionForm {
  email: FormData;
  handle: FormData;
  comment: FormData;
  password: FormData;
  options: DataDeletionOptions;
}

interface DataDeletionOptions {
  loading: boolean;
  showPassword: boolean;
}

export interface AdvertisementProps {
  deviceWidth: number;
}

export interface FaqProps {
  deviceWidth: number;
}

export interface PricingProps {
  deviceWidth: number;
}

export interface DataDeletionContainer {
  authenticated: boolean;
}
