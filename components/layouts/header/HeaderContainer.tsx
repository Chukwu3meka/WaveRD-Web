"use client";

import { Header } from ".";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { useStoreContext } from "components/providers/StoreContext";

import { Theme } from "interfaces/store/layout.interfaces";
import { ColorState, HeaderContainer as IHeaderContainer, VisibleState } from "interfaces/components/layout.interface";

export default function HeaderContainer({ position }: IHeaderContainer) {
  const { authenticated } = useStoreContext().user,
    { displayHeader, setTheme, theme, deviceSize } = useStoreContext().layout,
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [color, setColor] = useState<ColorState>({ first: "textSecondary", last: "primary" });

  useEffect(() => {
    console.log({ displayHeader });
  }, [displayHeader]);

  useEffect(() => {
    const headerWidth = document.getElementById("header")?.offsetWidth;
    if (headerWidth) {
      setVisible({ nav: headerWidth > 850, mobile: headerWidth < 600 });
    }
  }, [deviceSize.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = async (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);
    // authenticated && (await fetcher({ method: "POST", data: { theme: newTheme }, endpoint: "/accounts/theme" }).catch(() => {}));
  };

  // return <p>head</p>;
  return <Header {...{ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }} />;
}
