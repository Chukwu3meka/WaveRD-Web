import { Theme } from "./layouts.interface";
import { ReactChildren } from "./shared.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";

export interface StoreContextProviderProps {
  children: ReactChildren["children"];
}

export interface ProvidersProps {
  theme: Theme;
  initialized: boolean;
  displayHeader: boolean;
  children: React.ReactNode;
}
export interface ProvidersContainerProps {
  theme?: Theme;
  user: Profile | null;
  displayHeader?: boolean;
  children?: React.ReactNode;
  setProfileAction?: Function;
  setDeviceSizeAction?: Function;
  setDisplayHeaderAction?: Function;
}

export interface RootProviders {
  user: Profile | null;
  children: React.ReactNode;
}
