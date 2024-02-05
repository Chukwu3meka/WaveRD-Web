"use client";

import { RootLayout } from ".";
import { setCssThemeVar } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { createContext, useContext, useState } from "react";

import { Profile } from "interfaces/store/user.interfaces";
import { DeviceSize, Theme } from "interfaces/store/layout.interfaces";
import { StoreContext, StoreContextProviderProps } from "interfaces/components/providers.interface";

const StoreContext = createContext<StoreContext | null>(null);
const StoreProvider = ({ children }: StoreContextProviderProps) => {
  const [displayHeader, setDisplayHeader] = useState(false),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [deviceSize, setDeviceSize] = useState<DeviceSize>({ height: 0, width: 0 });

  const setContextProfile = (profile: Profile) => {
    const newTheme = profile ? profile.theme : theme;

    setTheme(newTheme);
    setProfile(profile);
    setCssThemeVar(newTheme);
    setAuthenticated(profile && profile.role !== "dummy");
  };

  console.log(profile.role);

  return (
    <StoreContext.Provider
      value={{
        user: { profile, setProfile: setContextProfile, authenticated },
        layout: { setTheme, theme, deviceSize, setDeviceSize, displayHeader, setDisplayHeader },
      }}>
      <RootLayout>{children}</RootLayout>
    </StoreContext.Provider>
  );
};

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a Store Context Provider");

  return context;
}

export default StoreProvider;
