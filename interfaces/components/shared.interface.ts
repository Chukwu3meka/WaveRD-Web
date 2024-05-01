import { ReactNode } from "react";
import { MouseEventHandler } from "react";
import { TypographyProps } from "@mui/material/Typography";
import { Profile, Role } from "interfaces/redux-store/account.interfaces";

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
