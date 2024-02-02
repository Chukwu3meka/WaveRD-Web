import { Profile } from "interfaces/store/user.interfaces";

export type theme = "dark" | "light";
export interface HeaderProps {
  authenticated: boolean;
  swapColorFn: Function;
  color: ColorState;
  theme: theme;
  themeHandler: Function;
  visible: VisibleState;
  className: "relativeHeader" | "stickyHeader" | "hiddenHeader";
}

export interface HeaderContainerProps {
  position: "relative" | "sticky";
}

export interface ColorState {
  first: "textSecondary" | "primary";
  last: "primary" | "textSecondary";
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

export interface InfoLinks {
  label: string;
  path: string;
}
