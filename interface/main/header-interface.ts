export interface IHeader {
  logoutHandler: Function;
  displayHeader: boolean;
  // thirdPartyAccounts: IThirdPartyAccounts[];
  authenticated: boolean;
}

export interface IHeaderContainer {
  displayHeader: boolean;
  logoutAction: Function;
  authenticated: boolean;
}
