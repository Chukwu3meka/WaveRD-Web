export interface IHeader {
  // logoutHandler: Function;
  displayHeader: boolean;
  // socialAccounts: IsocialAccounts[];
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}

export interface HeaderContainer {
  displayHeader: boolean;
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
  titleOnly: "dark" | "light" | null;
}

export interface RelativeHeader {
  theme: "dark" | "light";
  titleOnly: "dark" | "light" | null;
}
