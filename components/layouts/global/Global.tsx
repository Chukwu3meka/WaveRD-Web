"use client";

import useSWR from "swr";
import HeaderContainer from "../header";
import { useEffect, useState } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { authService } from "services/accounts.service";
import { useStoreContext } from "components/providers/StoreContext";
import { ReactChildren } from "interfaces/components/shared.interface";

export default function GlobalLayout({ children }: ReactChildren) {
  const { setProfile } = useStoreContext().user,
    useSwrOptions = { shouldRetryOnError: false },
    [prevScrollPos, setPrevScrollPos] = useState(0),
    { setDisplayHeader, setDeviceSize } = useStoreContext().layout,
    { data, isLoading } = useSWR("details", authService, useSwrOptions);

  useEffect(() => {
    // Set relative (not sticky) header height
    document.documentElement.style.setProperty("--headerHeight", "77px");
    // --visibleScreen: to fix wrong VH in  iPhone
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setProfile(data);
  }, [isLoading]);

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

  if (isLoading)
    return (
      <Stack sx={{ width: "100%", color: "green" }}>
        <LinearProgress color="inherit" />
      </Stack>
    );

  return (
    <>
      <HeaderContainer position="sticky" />
      {children}
    </>
  );
}
