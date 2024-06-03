"use client";

import AccountsService from "services/accounts.service";

import { ConsoleLayout } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { setCssThemeVar } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { setThemeAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { ConsoleLayoutContainerProps, Theme } from "interfaces/components/others/layouts.interface";
import Loading from "components/shared/loading";

const ConsoleLayoutContainer = (props: ConsoleLayoutContainerProps) => {
  const { children } = props,
    { setThemeAction } = props,
    accountsService = new AccountsService(),
    [activeRoute, setActiveRoute] = useState(""),
    [blankScreen, setBlankScreen] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    [profile, setProfile] = useState<null | Profile>(null),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme);

  useEffect(() => {
    setProfile(props.profile || null);
    setTheme(props.profile?.theme || INIT_PROFILE.theme);
  }, [props.profile]);

  useEffect(() => {
    setAuthenticated(props.authenticated || false);
  }, [props.authenticated]);

  useEffect(() => {
    setActiveRoute(props.activeRoute || "/");
  }, [props.activeRoute]);

  useEffect(() => {
    setBlankScreen(!props.deviceWidth || props.deviceWidth <= 1200);
  }, [props.deviceWidth]);

  const themeHandler = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);
    if (setThemeAction) setThemeAction(newTheme);

    if (authenticated)
      await accountsService
        .setTheme({ theme: newTheme })
        .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  if (blankScreen) return <p>Persisting layout. Kindly wait, Loading...</p>;

  return (
    <ConsoleLayout profile={profile} activeRoute={activeRoute} themeHandler={themeHandler}>
      {children}
    </ConsoleLayout>
  );
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    activeRoute: state.layout.route,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleLayoutContainer);