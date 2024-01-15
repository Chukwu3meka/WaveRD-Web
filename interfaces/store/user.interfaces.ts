import { Theme } from "./layout.interfaces";

export interface UserContext {
  setDetails: Function;
  details: null | Details;
  // setDetails: React.Dispatch<React.SetStateAction<null | Details>>;

  authenticated: boolean;
  // setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Details = {
  role: Role;
  name: string;
  handle: string;

  theme?: Theme;
};

export type Role = "admin" | "user";
