"use client";

import ClientProviders from ".";
import { defaultTheme } from "utils/constants";
import { setCssThemeVar } from "utils/helpers";
import { createContext, useContext, useState } from "react";

import { ReactChildren } from "interfaces/components/shared.interface";
import { Details, UserContext } from "interfaces/store/user.interfaces";
import { DeviceSize, LayoutContext, Theme } from "interfaces/store/layout.interfaces";

type StoreContext = { layout: LayoutContext; user: UserContext };
const StoreContext = createContext<StoreContext | null>(null);

export default function StoreContextProvider({ children }: ReactChildren) {
  const [theme, setTheme] = useState<Theme>(defaultTheme),
    [displayHeader, setDisplayHeader] = useState(false),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [userDetails, setUserDetails] = useState<Details | null>(null),
    [deviceSize, setDeviceSize] = useState<DeviceSize>({ height: 0, width: 0 });

  function setDetails(user: Details) {
    setUserDetails(user);
    setAuthenticated(!user);

    const matchMedia = window.matchMedia,
      userTheme = user && user.theme && user.theme,
      { innerWidth: width, innerHeight: height } = window,
      theme = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    setTheme(userTheme || theme);
    setDeviceSize({ width, height });
    setCssThemeVar(userTheme || theme);
  }

  return (
    <StoreContext.Provider
      value={{
        user: { details: userDetails, setDetails, authenticated },
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
