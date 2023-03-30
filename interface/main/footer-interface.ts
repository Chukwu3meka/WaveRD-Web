export interface IFooter {
  logoutHandler: Function;
  // socialAccounts: IsocialAccounts[];
  authenticated: boolean;
}

export interface IFooterContainer {
  logoutAction: Function;
  authenticated: boolean;
}
