import { ReactNode } from "react";
import { MouseEventHandler } from "react";
import { TypographyProps } from "@mui/material/Typography";
import { Profile, Role } from "interfaces/redux-store/account.interfaces";
import { BoxProps } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { ColorState, Theme, VisibleState } from "./layouts.interface";
import { Routes } from "interfaces/utils/constants.interface";

export interface ReactChildren {
  children: React.ReactNode;
}

export interface SocialContainerProps {
  fontSize?: string;
  filterParams: string[];
}

export interface Social {
  link: string;
  account: string;
  fontSize: string;
}

export interface NotFoundProps {
  height?: string;
}

export interface UserRoleProps {
  showDialog: boolean;
  role: Profile["role"];
  toggleHandler: MouseEventHandler<HTMLButtonElement>;
}

export interface ComingSoonContainerProps {
  header?: boolean;
  minHeight?: string;
  finishDate?: Date;
  title?: string;
}

export interface ComingSoonProps extends ComingSoonContainerProps {
  header: boolean;
  minHeight: string;
  timeLeft: TimeLeft;
}

export interface TimeLeft {
  date: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UserRoleContainerProps {
  role?: Role;
}

// export interface EllipsisProps extends ComponentType<TypographyProps> {
export interface EllipsisProps extends TypographyProps {
  children: ReactNode;
  lines: number;
}

export interface ModalProps {
  title?: string;
  children: ReactNode;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export interface ListProps extends BoxProps {
  label?: string;
  size?: "small" | "medium";
  Icon: SvgIconComponent;
  color?: "secondary" | "primary";
  active?: boolean;
}

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

export interface NavigationProps {
  routes: Routes[];
}

export interface NavigationContainerProps {
  research: string;
}
