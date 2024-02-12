// import { Theme } from "interfaces/store/layout.interfaces";

import { UserForm } from "interfaces/components/info.interfaces";

export interface ContactUsPayload {
  name: UserForm["name"]["value"];
  contact: UserForm["contact"]["value"];
  comment: UserForm["comment"]["value"];
  category: UserForm["options"]["category"];
  preference: UserForm["options"]["contact"];
}

// export interface ThemePayload {
//   theme: Theme;
// }

// export interface ExistsPayload {
//   variant: "handle" | "email";
//   data: string;
// }

// export interface SignupPayload {
//   email: string;
//   handle: string;
//   name: string;
//   password: string;
//   theme: string;
// }

// export interface InitPassResetService {
//   email: string;
// }
// export interface ConfPassResetService {
//   email: string;
//   password: string;
// }
