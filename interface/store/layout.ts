export interface LayoutState {
  activeRoute: string;
  theme: SetThemeAction;
  displayHeader: boolean;
  deviceWidth: SetDeviceSizeAction["deviceWidth"];
  deviceHeight: SetDeviceSizeAction["deviceHeight"];
}

export interface SetDeviceSizeAction {
  deviceWidth: number;
  deviceHeight: number;
}

export type SetThemeAction = "dark" | "light";
