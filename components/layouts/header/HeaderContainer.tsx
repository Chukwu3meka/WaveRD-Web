"use client";

import accountsService from "services/accounts.service";

import { Header } from ".";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { setThemeAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { ColorState, HeaderContainerProps, Theme, VisibleState } from "interfaces/components/layouts.interface";

const HeaderContainer = (props: HeaderContainerProps) => {
  const { position, setThemeAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [displayHeader, setDisplayHeader] = useState<boolean>(false),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    [color, setColor] = useState<ColorState>({ first: "text.secondary", last: "primary" }),
    className = position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader";

  useEffect(() => {
    setDisplayHeader(props.displayHeader!);
  }, [props.displayHeader]);

  useEffect(() => {
    setProfile(props.profile);
    setTheme(props.profile.theme);
    setAuthenticated(props.authenticated);
  }, [props.profile, props.authenticated]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelectorAll(`[class*="${className}"`);

    if (headerElement.length && headerElement[0] instanceof HTMLElement) {
      const offsetWidth = headerElement[0].offsetWidth;
      setVisible({ nav: offsetWidth > 850, mobile: offsetWidth < 600 });
    }
  }, [props.deviceWidth]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);
    if (setThemeAction) setThemeAction(newTheme);

    if (authenticated) {
      await accountsService.setTheme({ theme: newTheme }).catch((err) => {
        if (err) enqueueSnackbar("Failed to save new theme across profile", { variant: "error" });
      });
    }
  };

  return <Header {...{ className, authenticated, theme, swapColorFn, color, profile, themeHandler, visible }} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
