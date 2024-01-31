"use client";

import { Menu } from ".";
import { useState } from "react";
import { INIT_PROFILE } from "utils/constants";
import { useStoreContext } from "components/providers/StoreContext";

export default function MenuContainer() {
  const [menuOpen, setMenuOpen] = useState(false),
    { profile = INIT_PROFILE, authenticated } = useStoreContext().user,
    iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleMenuOpen = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
    setMenuOpen((status) => !status);
  };

  return <Menu {...{ toggleMenuOpen, iOS, menuOpen, profile, authenticated }} />;
}
