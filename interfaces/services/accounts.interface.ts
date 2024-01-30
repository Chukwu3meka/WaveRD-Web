import { Theme } from "interfaces/store/layout.interfaces";

export interface SigninPayload {
  email: string;
  password: string;
}

export interface ThemePayload {
  theme: Theme;
}

export interface ExistsPayload {
  variant: "handle" | "email";
  data: string;
}

export interface SignupPayload {
  email: string;
  handle: string;
  name: string;
  password: string;
}

export interface InitPassResetService {
  email: string;
}
export interface ConfPassResetService {
  email: string;
  password: string;
}
