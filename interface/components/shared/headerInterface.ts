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
