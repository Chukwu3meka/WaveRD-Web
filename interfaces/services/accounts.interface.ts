import { Theme } from "interfaces/store/layout.interfaces";

export interface signinPayload {
  email: string;
  password: string;
}

export interface themePayload {
  theme: Theme;
}
