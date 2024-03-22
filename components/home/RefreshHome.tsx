"use client";

import { useSearchParams } from "next/navigation";
import { OAUTH_PROVIDERS } from "utils/constants";

const RefreshHome = () => {
  const searchParams = useSearchParams(),
    oAuthUsed = searchParams.get("auth");

  // ? To get new cookies from server
  if (oAuthUsed && OAUTH_PROVIDERS.includes(oAuthUsed)) {
    if (location) location.replace("/");
  }

  return <></>;
};

export default RefreshHome;
