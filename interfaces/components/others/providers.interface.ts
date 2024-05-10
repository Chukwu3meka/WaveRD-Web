import { Theme } from "./layouts.interface";
import { ReactChildren } from "./shared.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";

export interface StoreContextProviderProps {
  children: ReactChildren["children"];
}

export interface ProvidersContainerProps {
  theme?: Theme;
  user: Profile | null;
  // modal: React.ReactNode;
  displayHeader?: boolean;
  children?: React.ReactNode;
  setProfileAction?: Function;
  setBreakpointAction?: Function;
  setDeviceSizeAction?: Function;
  setActiveRouteAction?: Function;
  setDisplayHeaderAction?: Function;
}

export interface AntProviderProps {
  theme: Theme;
  children: React.ReactNode;
}
