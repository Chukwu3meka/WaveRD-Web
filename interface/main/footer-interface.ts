export interface IFooter {
  logoutHandler: Function;
  thirdPartyAccounts: IThirdPartyAccounts[];
}

export type IThirdPartyAccounts = ["Facebook" | "Twitter" | "Instagram" | "LinkedIn" | "AlienForest" | "Pinterest" | "Github" | "YouTube" | "Fiverr" | "Whatsapp" | "Phone", string];

// export interface  {
//   //
// }
