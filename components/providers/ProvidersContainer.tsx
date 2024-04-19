"use client";

import { Providers } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { Theme } from "interfaces/components/layouts.interface";
import { RootState } from "interfaces/redux-store/store.interface";
import { BREAKPOINTS, HEADER_HEIGHT, INIT_PROFILE } from "utils/constants";
import { ProvidersContainerProps } from "interfaces/components/providers.interface";
import { setDeviceSizeAction, setProfileAction, setDisplayHeaderAction, setBreakpointAction } from "../../redux-store/actions";

const { xl, lg, md, sm } = BREAKPOINTS;

const ProvidersContainer = (props: ProvidersContainerProps) => {
  const { children, user, setProfileAction, setDeviceSizeAction, setDisplayHeaderAction, setBreakpointAction } = props,
    [initialized, setInitialized] = useState(false),
    [prevScrollPos, setPrevScrollPos] = useState(0),
    [displayHeader, setDisplayHeader] = useState(false),
    [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme);

  useEffect(() => {
    const profile = user || INIT_PROFILE;

    handleResize();
    setInitialized(true);
    setDisplayHeader(true);
    setTheme(profile.theme);
    setCssThemeVar(profile.theme);

    if (setProfileAction) setProfileAction(profile);

    console.log(`%cInitializing SoccerMASS...${new Date().toLocaleTimeString()}`, "color: green; font-family:serif; font-size: 12px");
    document.documentElement.style.setProperty("--headerHeight", `${HEADER_HEIGHT}px`); // <= Set relative (not sticky) header height
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`); // <=  --visibleScreen: to fix wrong VH in  iPhone

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

  useEffect(() => {
    if (initialized && props.displayHeader !== displayHeader) {
      setDisplayHeader(!!props.displayHeader);
      if (setDisplayHeaderAction) setDisplayHeaderAction(!!props.displayHeader);
    }
  }, [props.displayHeader]);

  useEffect(() => {
    setTheme(props.theme!);
  }, [props.theme]);

  const handleResize = () => {
    if (setDeviceSizeAction && setBreakpointAction) {
      const { innerWidth: width, innerHeight: height } = window;

      setDeviceSizeAction({ width, height });
      setBreakpointAction(width > xl ? "xl" : width > lg ? "lg" : width > md ? "md" : width > sm ? "sm" : "xs");
    }
  };

  const handleScroll = () => {
    const w = window,
      yScrollPosition = w.scrollY,
      pageTopReached = yScrollPosition < 81,
      scrollingToPageTop = yScrollPosition < prevScrollPos,
      areaHeight = Math.round(w.innerHeight + yScrollPosition) + 2,
      pageBottomReached = areaHeight >= document.body.offsetHeight,
      newDisplayHeader = !pageTopReached && (scrollingToPageTop || pageBottomReached);

    setPrevScrollPos(yScrollPosition);

    // ? Update displayHeader only when new state is diff from prev
    if (initialized && newDisplayHeader !== displayHeader) {
      setDisplayHeader(newDisplayHeader);
      if (setDisplayHeaderAction) setDisplayHeaderAction(newDisplayHeader);
    }
  };

  return (
    <Providers displayHeader={displayHeader} theme={theme} initialized={initialized}>
      {children}
    </Providers>
  );
};

const mapStateToProps = (state: RootState) => ({
    theme: state.account.profile.theme,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = { setProfileAction, setDeviceSizeAction, setDisplayHeaderAction, setBreakpointAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersContainer);
