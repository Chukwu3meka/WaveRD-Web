import { useEffect, useState } from "react";

import { Header } from ".";
import fetcher from "@utils/fetcher";
import { setCssThemeVar } from "@utils/handlers";
import { connector, ConnectorProps } from "@store";

import { Theme } from "@interface/utils/constantsInterface";
import { ColorState, HeaderContainer, VisibleState } from "@interface/components/shared/headerInterface";

export default connector((props: HeaderContainer & ConnectorProps) => {
  const { position, setThemeAction } = props,
    [color, setColor] = useState<ColorState>({ first: "textSecondary", last: "primary" }),
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [displayHeader, setDisplayHeader] = useState(null),
    [authenticated, setauthenticated] = useState(false);

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setauthenticated(!!props.auth || false);
  }, [props.auth]);

  useEffect(() => {
    setDisplayHeader(props.layout.header);
  }, [props.layout.header]);

  useEffect(() => {
    setTheme(props.layout.theme as Theme);
  }, [props.layout.theme]);

  useEffect(() => {
    const headerWidth = document.getElementById("header")?.offsetWidth;

    // console.log({ headerWidth });

    // setVisible({ nav: headerWidth > 1400, mobile: headerWidth < 600 });
    setVisible({ nav: headerWidth > 850, mobile: headerWidth < 600 });
  }, [props.layout.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = async (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    setThemeAction(newTheme);

    authenticated && (await fetcher({ method: "POST", payload: { theme: newTheme }, endpoint: "/accounts/theme" }).catch(() => {}));
  };

  return <Header {...{ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }} />;
});
