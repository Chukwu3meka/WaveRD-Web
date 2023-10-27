import { AuthState } from "@interface/store/auth";
import { LayoutState } from "@interface/store/layout";

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
  auth: AuthState;
  setThemeAction: Function;
  width: LayoutState["width"];
  theme: LayoutState["theme"];
  header: LayoutState["header"];
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
