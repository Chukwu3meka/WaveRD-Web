"use client";

import { createContext, useContext, useState } from "react";

import { ReactChildren } from "interfaces/components/shared.interface";
import { Details, UserContext } from "interfaces/store/user.interfaces";
import { DeviceSize, LayoutContext, Theme } from "interfaces/store/layout.interfaces";

type StoreContext = { layout: LayoutContext; user: UserContext };
const StoreContext = createContext<StoreContext | null>(null);

export default function StoreContextProvider({ children }: ReactChildren) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<Details | null>(null);
  const [deviceSize, setDeviceSize] = useState<DeviceSize>({ height: 0, width: 0 });

  function setDetails(user: Details) {
    setUserDetails(user);
    setAuthenticated(!user);

    const matchMedia = window.matchMedia,
      { innerWidth: width, innerHeight: height } = window,
      theme = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    setTheme(user.theme || theme);
    setDeviceSize({ width, height });
  }

  return (
    <StoreContext.Provider
      value={{
        user: { details: userDetails, setDetails, authenticated },
        layout: { setTheme, theme, deviceSize, setDeviceSize },
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStoreContext must be used within a Store Context Provider");

  return context;
}
