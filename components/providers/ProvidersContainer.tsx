"use client";

import { Providers } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setCssThemeVar } from "utils/helpers";
import { HEADER_HEIGHT, INIT_PROFILE } from "utils/constants";
import { Theme } from "interfaces/components/layouts.interface";
import { RootState } from "interfaces/redux-store/store.interface";
import { ProvidersContainerProps } from "interfaces/components/providers.interface";
import { setDeviceSizeAction, setProfileAction, setDisplayHeaderAction } from "app-store/actions";

const ProvidersContainer = (props: ProvidersContainerProps) => {
  const { children, user, setProfileAction, setDeviceSizeAction, setDisplayHeaderAction } = props,
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
    setProfileAction && setProfileAction(profile);

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
    if (props.displayHeader !== displayHeader) {
      setDisplayHeader(!!props.displayHeader);
    }
  }, [props.displayHeader]);

  const handleResize = () => {
    if (setDeviceSizeAction) {
      setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight });
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
    if (newDisplayHeader !== displayHeader) {
      setDisplayHeader(newDisplayHeader);
      setDisplayHeaderAction && setDisplayHeaderAction(newDisplayHeader);
    }
  };

  return (
    <Providers displayHeader={displayHeader} theme={theme} initialized={initialized}>
      {children}
    </Providers>
  );
};

const mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader }),
  mapDispatchToProps = { setProfileAction, setDeviceSizeAction, setDisplayHeaderAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersContainer);
