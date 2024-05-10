import { Profile } from "interfaces/redux-store/account.interfaces";
import { Routes } from "interfaces/utils/constants.interface";
import { ChangeEventHandler, MouseEventHandler } from "react";

export type Theme = "dark" | "light";

export type RootProps = { children: React.ReactNode; modal: React.ReactNode };

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

export interface ConsoleLayoutContainerProps {
  theme?: Theme;
  activeRoute?: string;
  deviceWidth?: number;
  authHandler?: Function;
  authenticated?: boolean;
  profile?: null | Profile;
  setThemeAction?: Function;
  children: React.ReactNode;
}

export interface ConsoleLayoutProps {
  activeRoute: string;
  profile: null | Profile;
  children: React.ReactNode;
  themeHandler: MouseEventHandler<HTMLButtonElement>;
}
