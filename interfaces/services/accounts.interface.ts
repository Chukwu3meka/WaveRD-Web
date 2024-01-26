import { Theme } from "interfaces/store/layout.interfaces";

export interface signinPayload {
  email: string;
  password: string;
}

export interface themePayload {
  theme: Theme;
}

export interface existsPayload {
  variant: "handle" | "email";
  data: string;
}

export interface signupPayload {
  email?: string;
  handle?: string;
  fullName?: string;
  password?: string;
}
