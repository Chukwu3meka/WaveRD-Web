"use client";

import { Header } from ".";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { useStoreContext } from "components/providers/StoreContext";
import * as accServices from "services/accounts.service";

import { Theme } from "interfaces/store/layout.interfaces";
import { ColorState, HeaderContainer as IHeaderContainer, VisibleState } from "interfaces/components/layout.interface";
import useSWR from "swr";

export default function HeaderContainer({ position }: IHeaderContainer) {
  const { authenticated } = useStoreContext().user,
    { setMessage } = useStoreContext().snackbar,
    { displayHeader, setTheme, theme, deviceSize } = useStoreContext().layout,
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [color, setColor] = useState<ColorState>({ first: "textSecondary", last: "primary" });

  useEffect(() => {
    const headerWidth = document.getElementById("header")?.offsetWidth;
    if (headerWidth) {
      setVisible({ nav: headerWidth > 850, mobile: headerWidth < 600 });
    }
  }, [deviceSize.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const fetcher = async () => {
    await accServices.setTheme(theme).catch((err) => {
      if (err) setMessage("Failed to updated theme");
    });
  };

  const themeHandler = async (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    if (authenticated) useSWR(accServices.URL, fetcher);
  };

  return <Header {...{ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }} />;
}
