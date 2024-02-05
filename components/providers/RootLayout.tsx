"use client";

import { Zoom } from "@mui/material";
import muiTheme from "utils/muiTheme";
import { Fade } from "react-awesome-reveal";
import { ThemeProvider } from "@mui/system";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import { getSystemTheme } from "utils/helpers";
import HeaderContainer from "../layouts/header";
import { SWRConfig, SWRConfiguration } from "swr";
import { LinearProgress, Stack } from "@mui/material";
import stylesVariables from "styles/variables.module.scss";
import { profileService } from "services/accounts.service";
import { HEADER_HEIGHT, INIT_PROFILE } from "utils/constants";
import { useStoreContext } from "components/providers/StoreProvider";

import { ReactChildren } from "interfaces/components/shared.interface";
import UserRoleContainer from "components/shared/user-role/UserRoleContainer";

const swrConfigOptions: SWRConfiguration = {};
const RootLayout = ({ children }: ReactChildren) => {
  const [header, setHeader] = useState(false),
    [initialized, setInitialized] = useState(false),
    [prevScrollPos, setPrevScrollPos] = useState(0),
    { setProfile: setContextProfile } = useStoreContext().user,
    { theme, setDisplayHeader, setDeviceSize } = useStoreContext().layout;

  useEffect(() => {
    initSoccerMASS();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const initSoccerMASS = async () => {
    setHeader(true);
    setInitialized(false);

    console.log(`%cInitializing SoccerMASS...${new Date().toLocaleTimeString()}`, "color: green; font-family:serif; font-size: 20px");
    document.documentElement.style.setProperty("--headerHeight", `${HEADER_HEIGHT}px`); // <= Set relative (not sticky) header height
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`); // <=  --visibleScreen: to fix wrong VH in  iPhone

    await profileService()
      .then(({ data, success }) => {
        if (!success) throw { message: "Profile not found" };
        setContextProfile(data);
      })
      .catch(() => {
        setContextProfile({ ...INIT_PROFILE, theme: getSystemTheme() });
      });
  };

  const handleResize = () => {
    setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const handleScroll = () => {
    const w = window,
      yScrollPosition = w.scrollY,
      pageTopReached = yScrollPosition < 81,
      scrollingToPageTop = yScrollPosition < prevScrollPos,
      areaHeight = Math.round(w.innerHeight + yScrollPosition) + 2,
      pageBottomReached = areaHeight >= document.body.offsetHeight,
      displayHeader = !pageTopReached && (scrollingToPageTop || pageBottomReached);

    setDisplayHeader(displayHeader);
    setPrevScrollPos(yScrollPosition);
  };

  return initialized ? (
    <Stack sx={{ width: "100%", color: stylesVariables.primaryColor }}>
      <LinearProgress color="inherit" />
    </Stack>
  ) : (
    <>
      <ThemeProvider theme={muiTheme(theme)}>
        <SnackbarProvider TransitionComponent={Zoom} maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <SWRConfig value={swrConfigOptions}>
            <UserRoleContainer />
            {header ? <HeaderContainer position="sticky" /> : null}

            <Fade direction="down" triggerOnce={true} big={true} duration={2500} style={{ perspective: "100px" }}>
              {children}
            </Fade>
          </SWRConfig>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
