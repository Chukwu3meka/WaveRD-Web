"use client";

import { Menu } from ".";
import { useState } from "react";
import { useStoreContext } from "components/providers/StoreContext";
import { Profile } from "interfaces/store/user.interfaces";
import { INIT_PROFILE } from "utils/constants";

export default function MenuContainer() {
  const { profile: user } = useStoreContext().user,
    [menuOpen, setMenuOpen] = useState(false),
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (!user) setProfile(INIT_PROFILE);

  const toggleMenuOpen = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
    setMenuOpen((status) => !status);
  };

  return <Menu {...{ toggleMenuOpen, iOS, menuOpen, profile }} />;
}
