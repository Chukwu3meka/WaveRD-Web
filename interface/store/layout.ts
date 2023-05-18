import { Theme } from "@interface/utils/constantsInterface";

export interface LayoutState {
  route: string;
  theme: Theme;
  header: boolean;
  width: SetDeviceSizeAction["width"];
  height: SetDeviceSizeAction["height"];
}

export interface SetDeviceSizeAction {
  width: number;
  height: number;
}
