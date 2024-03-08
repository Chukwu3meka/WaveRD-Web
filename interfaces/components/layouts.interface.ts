import { MouseEventHandler } from "react";
import { Profile } from "interfaces/redux-store/account.interfaces";

export type Theme = "dark" | "light";
export interface HeaderProps {
  authenticated: boolean;
  swapColorFn: Function;
  color: ColorState;
  theme: Theme;
  profile: Profile;
  themeHandler: MouseEventHandler<HTMLButtonElement>;
  visible: VisibleState;
  className: "relativeHeader" | "stickyHeader" | "hiddenHeader";
}

export interface HeaderContainerProps {
  profile: Profile;
  deviceWidth: number;
  displayHeader: boolean;
  authenticated: boolean;
  setThemeAction?: Function;
  position: "relative" | "sticky";
}

export interface ColorState {
  first: "text.secondary" | "primary";
  last: "primary" | "text.secondary";
}

export interface MenuContainerProps {
  profile: Profile;
  authenticated: boolean;
}

export interface VisibleState {
  nav: boolean;
  mobile: boolean;
}

export interface MenuProps {
  iOS: boolean;
  profile: Profile;
  menuOpen: boolean;
  authenticated: boolean;
  toggleMenuOpen: Function;
}

export interface SlidesProp {
  layout: "accounts";
}

export interface InfoLayoutProps {
  activeRoute: string;
  deviceWidth: number;
  children: React.ReactNode;
  autoCompleteHandler: Function;
}

export interface InfoLayoutContainerProps {
  deviceWidth: number;
  children: React.ReactNode;
}
