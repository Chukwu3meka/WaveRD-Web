"use client";

import { useSearchParams } from "next/navigation";
import { OAUTH_PROVIDERS } from "utils/constants";
import { ApiHub, ManagerContainer, WelcomeContainer } from "components/home";

const HomeContainer = () => {
  const searchParams = useSearchParams(),
    oAuthUsed = searchParams.get("auth");

  // ? To get new cookies from server
  if (oAuthUsed && OAUTH_PROVIDERS.includes(oAuthUsed)) {
    if (location) location.replace("/");
  }

  return (
    <main>
      <WelcomeContainer />
      <ManagerContainer />
      <ApiHub />
    </main>
  );
};

export default HomeContainer;
