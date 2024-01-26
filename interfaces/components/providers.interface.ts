import { LayoutContext } from "interfaces/store/layout.interfaces";
import { Profile, UserContext } from "interfaces/store/user.interfaces";

export type StoreContext = { layout: LayoutContext; user: UserContext };

export interface StoreContextProviderProps {
  profile: Profile;
  children: React.ReactNode;
}
