export type LayoutContext = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;

  deviceSize: DeviceSize;
  setDeviceSize: React.Dispatch<React.SetStateAction<DeviceSize>>;

  // route: string;
  // header: boolean;
};

export type Theme = "dark" | "light";

export type DeviceSize = {
  width: number;
  height: number;
};
