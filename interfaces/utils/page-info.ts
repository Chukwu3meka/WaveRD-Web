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
  termsAndCondition: PageInfoData;
  dataDeletion: PageInfoData;
  faq: PageInfoData;
  advertisement: PageInfoData;
  pricing: PageInfoData;
  organization: PageInfoData;
  apihub: PageInfoData;
  apihubEndpoints: PageInfoData;
  // [key: string]: PageInfoData;
}
