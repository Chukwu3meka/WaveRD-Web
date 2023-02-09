import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LayoutContainer from "@component/authManagement/layout";
import Head from "next/head";

const Page = () => {
  const router = useRouter(),
    { route } = router.query,
    [component, setComponent] = useState(<></>),
    [invalidRoute, setInvalidRoute] = useState(false);

  useEffect(() => {
    // ? Verify that user has visited a valid auth route
    if (["emailConfirmation", "forgotPassword", "passwordReset", "signin", "signup"].includes(route as string)) {
      const AuthPage = dynamic(() => import(`@component/authManagement/${route}`));
      setComponent(<AuthPage />);
    } else {
      setInvalidRoute(true);
    }
  }, []);

  return invalidRoute ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>
      <Head>
        <title>{(route as string)?.toUpperCase()} Page - SoccerMASS</title>
        <meta name="keywords" content={`${route as string}, soccer manager, soccer, soccermass, football manager, football`} />
        <meta name="description" content={`SoccerMASS Auth Page - ${route as string}`} />
        <meta property="og:description" content={`SoccerMASS Auth Page - ${route as string}`} />
      </Head>

      <LayoutContainer component={component} />
    </>
  );
};

export default Page;
