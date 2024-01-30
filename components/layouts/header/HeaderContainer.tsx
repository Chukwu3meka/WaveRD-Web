"use client";

import { Header } from ".";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { themeService } from "services/accounts.service";
import { useStoreContext } from "components/providers/StoreContext";

import { Theme } from "interfaces/store/layout.interfaces";
import { ColorState, HeaderContainerProps, VisibleState } from "interfaces/components/layouts.interface";

export default function HeaderContainer({ position }: HeaderContainerProps) {
  const { enqueueSnackbar } = useSnackbar(),
    { authenticated } = useStoreContext().user,
    { displayHeader, setTheme, theme, deviceSize } = useStoreContext().layout,
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [color, setColor] = useState<ColorState>({ first: "textSecondary", last: "primary" }),
    className = position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader";

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelectorAll(`[class*="${className}"`);

    if (headerElement.length && headerElement[0] instanceof HTMLElement) {
      const offsetWidth = headerElement[0].offsetWidth;
      setVisible({ nav: offsetWidth > 850, mobile: offsetWidth < 600 });
    }
  }, [deviceSize.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = async (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    if (authenticated) {
      await themeService({ theme }).catch((err) => {
        if (err) enqueueSnackbar("Failed to save new theme across profile", { variant: "error" });
      });
    }
  };

  return <Header {...{ className, authenticated, swapColorFn, color, theme, themeHandler, visible }} />;
}
