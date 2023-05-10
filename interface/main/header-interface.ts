export interface IHeader {
  // logoutHandler: Function;
  displayHeader: boolean;
  // socialAccounts: IsocialAccounts[];
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}

export interface HeaderContainer {
  position: "relative" | "sticky";
  // displayHeader?: boolean;
  // relativeHeader: "dark" | "light" | null;
  // titleOnly: "dark" | "light" | null;
  // authenticated?: boolean; // <= coming from redux store
}
