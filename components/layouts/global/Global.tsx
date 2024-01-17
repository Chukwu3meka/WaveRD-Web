"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { useStoreContext } from "components/providers/StoreContext";
import { URL as authServiceURL, getDetails } from "services/auth.service";

import { ReactChildren } from "interfaces/components/shared.interface";
import HeaderContainer from "../header";

export default function GlobalLayout({ children }: ReactChildren) {
  const { setDetails } = useStoreContext().user,
    useSwrOptions = { shouldRetryOnError: false },
    { setDisplayHeader, setDeviceSize } = useStoreContext().layout,
    [prevScrollPos, setPrevScrollPos] = useState(0),
    { data, isLoading } = useSWR(authServiceURL, getDetails, useSwrOptions);

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
    setDetails(data);
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
      // yScrollPosition = w.pageYOffset, // <= deprecated,
      yScrollPosition = w.scrollY,
      pageTopReached = yScrollPosition < 81,
      scrollingToPageTop = yScrollPosition < prevScrollPos,
      areaHeight = Math.round(w.innerHeight + yScrollPosition) + 2,
      pageBottomReached = areaHeight >= document.body.offsetHeight;

    if (!pageTopReached && (scrollingToPageTop || pageBottomReached)) {
      console.log(true);
      setDisplayHeader(true);
    } else {
      console.log(false);
      setDisplayHeader(false);
    }

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
      {/* <Link href="/">home</Link>
      <Link href="/accounts">accounts</Link>
      <Link href="/accounts/signin">signin</Link> */}
    </>
  );
}
