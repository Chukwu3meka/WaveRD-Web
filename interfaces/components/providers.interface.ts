import { ReactChildren } from "./shared.interface";
import { LayoutContext } from "interfaces/store/layout.interfaces";
import { UserContext } from "interfaces/store/user.interfaces";

export type StoreContext = { layout: LayoutContext; user: UserContext };

export interface StoreContextProviderProps {
  children: ReactChildren["children"];
}
