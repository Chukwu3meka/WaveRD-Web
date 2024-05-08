// import { Theme } from "interfaces/store/layout.interfaces";

import { CustomerUsForm } from "interfaces/components/others/info.interfaces";

export interface ContactUsPayload {
  name: CustomerUsForm["name"]["value"];
  contact: CustomerUsForm["contact"]["value"];
  comment: CustomerUsForm["comment"]["value"];
  category: CustomerUsForm["options"]["category"];
  preference: CustomerUsForm["options"]["contact"];
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
