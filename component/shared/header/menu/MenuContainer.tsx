import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Menu } from ".";
import { connector, ConnectorProps } from "@store";

import { HeaderContainer } from "@interface/main/header-interface";
import { SetThemeAction } from "@interface/store/layout";
import { setCssThemeVar } from "@utils/handlers";

const defaultProfile = {
  name: "SoccerMASS",
  handle: "API Hub and Soccer Manager",
  image: "/images/layout/profile.webp",
  auth: false,
};

export default connector((props: any) => {
  const { signoutAction, displayHeader, relativeHeader = null, titleOnly, setThemeAction } = props,
    [color, setColor] = useState({ first: "textSecondary", last: "primary" }),
    [authenticated, setauthenticated] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);

  const [theme, setTheme] = useState<SetThemeAction>("light");

  useEffect(() => {
    setauthenticated(!!props.auth);
    if (props.auth) {
      const { fullName: name, handle } = props.auth;
      setProfile({ auth: true, handle, name, image: defaultProfile.image });
    } else {
      setProfile(defaultProfile);
    }
  }, [props.auth]);

  useEffect(() => {
    setTheme(props.layout.theme as SetThemeAction);
  }, [props.layout.theme]);

  useEffect(() => {
    setTheme(props.layout.theme as SetThemeAction);
    const divElement = document.getElementById("header");
    const width = divElement.offsetWidth;
    // console.log(props.layout.deviceWidth, width);
  }, [props.layout.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = (theme: SetThemeAction) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    setThemeAction(newTheme);

    // persist in database
  };

  const [menuOpen, setMenuOpen] = useState(false),
    iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleMenuOpen = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    if (process.env.NODE_ENV === "development") setMenuOpen((value) => !value);
  };

  return (
    <Menu
      {...{
        toggleMenuOpen,
        iOS,
        menuOpen,
        profile,
        signoutAction,
        displayHeader,
        authenticated,
        relativeHeader,
        swapColorFn,
        color,
        titleOnly,
        theme,
        themeHandler,
      }}
    />
  );
});
