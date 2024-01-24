import { Theme } from "./layout.interfaces";

export type Role = "admin" | "user";
export interface UserContext {
  setProfile: Function;
  profile: null | Profile;
  // setDetails: React.Dispatch<React.SetStateAction<null | Details>>;

  authenticated: boolean;
  // setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Profile = {
  role: Role;
  name: string;
  theme: Theme;
  handle: string;
  avatar: string;
};
