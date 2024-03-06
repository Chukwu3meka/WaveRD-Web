import { Theme } from "interfaces/components/layouts.interface";

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
  theme: string;
}

export interface InitPassResetService {
  email: string;
}
export interface ConfPassResetService {
  email: string;
  password: string;
}

export interface DataDeletionService {
  email: string;
  handle: string;
  comment: string;
  password: string;
}
