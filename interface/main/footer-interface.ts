export interface IFooter {
  logoutHandler: Function;
  // thirdPartyAccounts: IThirdPartyAccounts[];
  authenticated: boolean;
}

export interface IFooterContainer {
  logoutAction: Function;
  authenticated: boolean;
}
