export interface IHeader {
  logoutHandler: Function;
  // thirdPartyAccounts: IThirdPartyAccounts[];
  authenticated: boolean;
}

export interface IHeaderContainer {
  logoutAction: Function;
  authenticated: boolean;
}
