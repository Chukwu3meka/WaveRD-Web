export interface Menu {
  toggleMenuOpen: Function;
  iOS: boolean;
  menuOpen: boolean;
  authenticated: boolean;
  profile: ProfileState;
}

export interface ProfileState {
  name: string;
  handle: string;
  image: string;
  auth: boolean;
}
