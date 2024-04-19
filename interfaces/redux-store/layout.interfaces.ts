// import { Theme } from "interfaces/components/layouts.interface";

// export type LayoutContext = {
//   theme: Theme;
//   setTheme: React.Dispatch<React.SetStateAction<Theme>>;

//   deviceSize: DeviceSize;
//   setDeviceSize: React.Dispatch<React.SetStateAction<DeviceSize>>;

//   displayHeader: boolean;
//   setDisplayHeader: React.Dispatch<React.SetStateAction<boolean>>;
// };

export type DeviceSize = {
  width: number;
  height: number;
};

export interface LayoutState {
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl";
  displayHeader: boolean;
  route: string;
  height: number;
  width: number;
}
