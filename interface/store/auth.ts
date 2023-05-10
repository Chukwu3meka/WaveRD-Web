export interface SetAuthAction {
  role: "admin" | "user";
  fullName: string;
  handle: string;
  cookieConsent: boolean;
}

export type AuthState = SetAuthAction | null;

export interface GetCookieAction {
  setCookieNotice: Function;
  setTheme: Function;
}
