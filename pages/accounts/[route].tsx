import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LayoutContainer from "@component/authManagement/layout";
import Head from "next/head";
import { capitalizeFirstLetter } from "@utils/handlers";

const Page = () => {
  const router = useRouter(),
    { route } = router.query,
    [component, setComponent] = useState(<></>),
    [invalidRoute, setInvalidRoute] = useState(false);

  useEffect(() => {
    // ? Verify that user has visited a valid auth route
    if (["emailConfirmation", "forgotPassword", "signin", "signup"].includes(route as string)) {
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
        <title>SoccerMASS {capitalizeFirstLetter(route as string)}</title>
        <meta name="description" content={`SoccerMASS ${capitalizeFirstLetter(route as string)}`} />
        <meta property="og:description" content={`SoccerMASS ${capitalizeFirstLetter(route as string)}`} />
        <meta name="keywords" content={`${route as string}, soccer manager, soccer, soccermass, football manager, football`} />
      </Head>

      <LayoutContainer component={component} />
    </>
  );
};

export default Page;
