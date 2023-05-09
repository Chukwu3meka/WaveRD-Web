export interface LayoutState {
  deviceWidth: number;
  deviceHeight: number;
  activeRoute: string;
}

export interface SetDeviceSizeAction {
  deviceWidth: number;
  deviceHeight: number;
}
