export interface IHeader {
  // logoutHandler: Function;
  displayHeader: boolean;
  // thirdPartyAccounts: IThirdPartyAccounts[];
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}

export interface IHeaderContainer {
  logoutAction: Function;
  displayHeader: boolean;
  authenticated: boolean;
  relativeHeader: "dark" | "light" | null;
}
