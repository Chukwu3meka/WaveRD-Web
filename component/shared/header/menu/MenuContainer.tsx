import { useEffect, useState } from "react";

import { Menu } from ".";
import { connector, ConnectorProps } from "@store";

const defaultProfile = { name: "SoccerMASS", handle: "API Hub and Soccer Manager", image: "/images/layout/profile.webp", auth: false };

export default connector((props: ConnectorProps) => {
  const [menuOpen, setMenuOpen] = useState(!false),
    [profile, setProfile] = useState(defaultProfile),
    [authenticated, setauthenticated] = useState(false),
    iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    setauthenticated(!!props.auth);
    if (props.auth) {
      const { fullName: name, handle } = props.auth;
      setProfile({ auth: true, handle, name, image: defaultProfile.image });
    } else {
      setProfile(defaultProfile);
    }
  }, [props.auth]);

  const toggleMenuOpen = (status: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
    setMenuOpen(status);
  };

  return <Menu {...{ toggleMenuOpen, iOS, menuOpen, authenticated, profile }} />;
});
