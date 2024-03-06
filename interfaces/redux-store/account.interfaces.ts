import { Theme } from "interfaces/components/layouts.interface";

export type Profile = {
  role: Role;
  name: string;
  theme: Theme;
  handle: string;
  avatar: string;
};

export type Role = "admin" | "user" | "dummy" | "test";

export interface InitState {
  profile: Profile;
  authenticated: boolean;
}

// export interface UserContext {
//   setProfile: Function;
//   profile: Profile;
//   // setDetails: React.Dispatch<React.SetStateAction<null | Details>>;

//   authenticated: boolean;
//   // setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
// }
