"use client";

import { Menu } from ".";
import { useState } from "react";
import { isSystemIOS } from "utils/helpers";
import { useStoreContext } from "components/providers/StoreProvider";

const MenuContainer = () => {
  const iOS = isSystemIOS(),
    [menuOpen, setMenuOpen] = useState(false),
    { profile, authenticated } = useStoreContext().user;

  const toggleMenuOpen = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
    setMenuOpen((status) => !status);
  };

  return <Menu {...{ toggleMenuOpen, iOS, menuOpen, profile, authenticated }} />;
};

export default MenuContainer;
