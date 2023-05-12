export interface LayoutState {
  route: string;
  theme: SetThemeAction;
  header: boolean;
  width: SetDeviceSizeAction["width"];
  height: SetDeviceSizeAction["height"];
}

export interface SetDeviceSizeAction {
  width: number;
  height: number;
}

export type SetThemeAction = "dark" | "light";
