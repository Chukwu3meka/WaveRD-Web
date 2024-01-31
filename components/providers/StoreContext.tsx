"use client";

import { ClientProviders } from ".";
import { setCssThemeVar } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { LinearProgress, Stack } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

import { Profile } from "interfaces/store/user.interfaces";
import { DeviceSize, Theme } from "interfaces/store/layout.interfaces";
import { StoreContext, StoreContextProviderProps } from "interfaces/components/providers.interface";

const StoreContext = createContext<StoreContext | null>(null);

export default function StoreContextProvider({ children, profile: rootProfile }: StoreContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true),
    [displayHeader, setDisplayHeader] = useState(false),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [profile, setProfile1] = useState<Profile | null>(rootProfile),
    [deviceSize, setDeviceSize] = useState<DeviceSize>({ height: 0, width: 0 });

  useEffect(() => {
    initSoccerMASS();
  }, [rootProfile]);

  function initSoccerMASS() {
    console.log("Initializing SoccerMASS");

    const media = window && window.matchMedia,
      darkMode = media && media("(prefers-color-scheme: dark)").matches;

    setIsLoading(false);
    setProfile2(rootProfile || { ...INIT_PROFILE, theme: darkMode ? "dark" : "light" });
  }

  function setProfile2(profile: Profile) {
    const newTheme = profile ? profile.theme : theme;

    setTheme(newTheme);
    setProfile1(profile);
    setCssThemeVar(newTheme);
    setAuthenticated(profile && profile.role !== "dummy");
  }

  return isLoading ? (
    <Stack sx={{ width: "100%", color: "green" }}>
      <LinearProgress color="inherit" />
    </Stack>
  ) : (
    <StoreContext.Provider
      value={{
        user: { profile, setProfile: setProfile2, authenticated },
        layout: { setTheme, theme, deviceSize, setDeviceSize, displayHeader, setDisplayHeader },
      }}>
      <ClientProviders>{children}</ClientProviders>
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a Store Context Provider");

  return context;
}
