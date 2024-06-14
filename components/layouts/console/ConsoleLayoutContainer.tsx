"use client";

import CONSOLE_ROUTES from "routes/console.routes";
import AccountsService from "services/accounts.service";

import { ConsoleLayout } from ".";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { setCssThemeVar } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { setThemeAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";
import { ConsoleLayoutContainerProps, Theme } from "interfaces/components/others/layouts.interface";

const ConsoleLayoutContainer = (props: ConsoleLayoutContainerProps) => {
  const router = useRouter(),
    { children } = props,
    { setThemeAction } = props,
    accountsService = new AccountsService(),
    [activeRoute, setActiveRoute] = useState(""),
    [blankScreen, setBlankScreen] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    [title, setTitle] = useState("Wave Research Console"),
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

    const route = CONSOLE_ROUTES.find((route) => route.path === props.activeRoute);
    setTitle(route ? route.title : "Wave Research Console");
  }, [props.activeRoute]);

  useEffect(() => {
    setBlankScreen(!props.deviceWidth || props.deviceWidth <= 1000);
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

  function prevPageHandler() {
    router.back();
  }

  function menuPageHandler() {
    const [, , menu] = activeRoute.split("/");
    router.push(`/console/${menu.replace("console-", "")}`);
  }

  if (blankScreen) return <p>Persisting layout. Kindly wait, Loading...</p>;

  return (
    <ConsoleLayout
      title={title}
      profile={profile}
      activeRoute={activeRoute}
      themeHandler={themeHandler}
      menuPageHandler={menuPageHandler}
      prevPageHandler={prevPageHandler}>
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
