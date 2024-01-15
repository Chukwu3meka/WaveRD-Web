import { Theme } from "interfaces/store/layout.interfaces";
import { Details } from "interfaces/store/user.interfaces";

export interface Header {
  position: "relative" | "sticky";
  authenticated: boolean;
  displayHeader: boolean;
  swapColorFn: Function;
  color: ColorState;
  theme: theme;
  themeHandler: Function;
  visible: VisibleState;
}

export interface HeaderContainer {
  auth: Details;
  setThemeAction: Function;
  width: number;
  theme: Theme;
  header: number;
  position: "relative" | "sticky";
}

export type theme = "dark" | "light";

export interface ColorState {
  first: "textSecondary" | "primary";
  last: "primary" | "textSecondary";
}

export interface VisibleState {
  nav: boolean;
  mobile: boolean;
}

export interface Menu {
  toggleMenuOpen: Function;
  iOS: boolean;
  menuOpen: boolean;
  authenticated: boolean;
  profile: ProfileState;
}

export interface ProfileState {
  name: string;
  handle: string;
  image: string;
  auth: boolean;
}
