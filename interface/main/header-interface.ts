export interface IHeader {
  // logoutHandler: Function;
  displayHeader: boolean;
  // socialAccounts: IsocialAccounts[];
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}

export interface IHeaderContainer {
  logoutAction: Function;
  displayHeader: boolean;
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}

export interface IRelativeHeader {
  theme: "dark" | "light";
}
