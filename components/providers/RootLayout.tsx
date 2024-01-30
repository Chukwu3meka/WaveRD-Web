"use client";

import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import HeaderContainer from "../layouts/header";
import { useStoreContext } from "components/providers/StoreContext";

import { ReactChildren } from "interfaces/components/shared.interface";
import { HEADER_HEIGHT } from "utils/constants";

export default function RootLayout({ children }: ReactChildren) {
  const [header, setHeader] = useState(false),
    [prevScrollPos, setPrevScrollPos] = useState(0),
    { setDisplayHeader, setDeviceSize } = useStoreContext().layout;

  useEffect(() => {
    setHeader(true);
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

  function handleResize() {
    setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
  }

  function handleScroll() {
    const w = window,
      yScrollPosition = w.scrollY,
      pageTopReached = yScrollPosition < 81,
      scrollingToPageTop = yScrollPosition < prevScrollPos,
      areaHeight = Math.round(w.innerHeight + yScrollPosition) + 2,
      pageBottomReached = areaHeight >= document.body.offsetHeight,
      displayHeader = !pageTopReached && (scrollingToPageTop || pageBottomReached);

    setDisplayHeader(displayHeader);
    setPrevScrollPos(yScrollPosition);
  }

  return (
    <>
      {header ? <HeaderContainer position="sticky" /> : <></>}

      <Fade direction="down" triggerOnce={true} big={true} duration={2500} style={{ perspective: "100px" }}>
        {children}
      </Fade>
    </>
  );
}
