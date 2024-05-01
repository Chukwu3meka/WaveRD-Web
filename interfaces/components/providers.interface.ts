import { Theme } from "./layouts.interface";
import { ReactChildren } from "./shared.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";

export interface StoreContextProviderProps {
  children: ReactChildren["children"];
}

export interface ProvidersContainerProps {
  theme?: Theme;
  user: Profile | null;
  displayHeader?: boolean;
  children?: React.ReactNode;
  setProfileAction?: Function;
  setBreakpointAction?: Function;
  setDeviceSizeAction?: Function;
  setDisplayHeaderAction?: Function;
}

export interface RootProvidersProps {
  modal: React.ReactNode;
  children: React.ReactNode;
}
