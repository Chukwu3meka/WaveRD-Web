interface PageInfoData {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface PageInfo {
  home: PageInfoData;
  signup: PageInfoData;
  signin: PageInfoData;
  passwordReset: PageInfoData;
  cookiePolicy: PageInfoData;
  privacyPolicy: PageInfoData;
  contactUs: PageInfoData;
  terms: PageInfoData;
  // [key: string]: PageInfoData;
}
