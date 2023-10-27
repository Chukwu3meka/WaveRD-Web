import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { Header } from ".";
import fetcher from "@utils/fetcher";
import { setThemeAction } from "@store-actions";
import { setCssThemeVar } from "@utils/handlers";

import { Theme } from "@interface/utils/constantsInterface";
import { ColorState, HeaderContainer as IHeaderContainer, VisibleState } from "@interface/components/shared/headerInterface";

const HeaderContainer = (props: IHeaderContainer) => {
  const { position, setThemeAction } = props,
    [theme, setTheme] = useState<Theme>("light"),
    [displayHeader, setDisplayHeader] = useState(null),
    [authenticated, setauthenticated] = useState(false),
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [color, setColor] = useState<ColorState>({ first: "textSecondary", last: "primary" });

  useEffect(() => {
    setauthenticated(!!props.auth || false);
  }, [props.auth]);

  useEffect(() => {
    setDisplayHeader(props.header);
  }, [props.header]);

  useEffect(() => {
    setTheme(props.theme as Theme);
  }, [props.theme]);

  useEffect(() => {
    const headerWidth = document.getElementById("header")?.offsetWidth;
    setVisible({ nav: headerWidth > 850, mobile: headerWidth < 600 });
  }, [props.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = async (theme: Theme) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    setThemeAction(newTheme);

    authenticated && (await fetcher({ method: "POST", data: { theme: newTheme }, endpoint: "/accounts/theme" }).catch(() => {}));
  };

  return <Header {...{ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }} />;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    width: state.layout.width,
    theme: state.layout.theme,
    header: state.layout.header,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
