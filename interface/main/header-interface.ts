export interface IHeader {
  // logoutHandler: Function;
  displayHeader: boolean;
  // thirdPartyAccounts: IThirdPartyAccounts[];
  authenticated: boolean;
  relativeHeader: boolean;
}

export interface IHeaderContainer {
  logoutAction: Function;
  displayHeader: boolean;
  authenticated: boolean;
  relativeHeader: boolean;
}
