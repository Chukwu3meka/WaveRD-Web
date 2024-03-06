import { MouseEventHandler } from "react";
import { Profile, Role } from "interfaces/redux-store/account.interfaces";

// ? Interfaces

// export interface RoutesHandler {
//   router: NextRouter;
//   authenticated: boolean;
//   setRoute: Function;
//   // setActiveRouteAction;
//   enqueueSnackbar: EnqueueSnackbar;
// }

// export interface HandleScroll {
//   prevScrollPos: number;
//   setPrevScrollPos: Function;
//   setDisplayHeaderAction: Function;
// }

// export interface SubLayout {
//   Component: AppProps["Component"];
//   pageProps: AppProps["pageProps"];
//   loading: boolean;
// }

// export interface InfoLayout extends SubLayout {
//   activeRoute: string;
//   deviceWidth: number;
//   autoCompleteHandler: Function;
// }

// export interface NavLinks {
//   label: string;
//   path: string;
// }

// export interface Header {
//   position: "relative" | "sticky";
//   authenticated: boolean;
//   displayHeader: boolean;
//   swapColorFn: Function;
//   color: ColorState;
//   theme: Theme;
//   themeHandler: Function;
//   visible: VisibleState;
// }

// export interface HeaderContainer {
//   auth: UserContext;
//   setThemeAction: Function;
//   width: number;
//   theme: Theme;
//   header: boolean;
//   position: "relative" | "sticky";
// }

// export interface ColorState {
//   first: "textSecondary" | "primary";
//   last: "primary" | "textSecondary";
// }

// export interface VisibleState {
//   nav: boolean;
//   mobile: boolean;
// }

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
