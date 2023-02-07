import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LayoutContainer from "@component/authManagement/layout";

const Page = () => {
  const router = useRouter(),
    [component, setComponent] = useState(<></>),
    [invalidRoute, setInvalidRoute] = useState(false);

  useEffect(() => {
    // ? Verify that user has visited a valid auth route
    const { route } = router.query;
    if (["emailConfirmation", "forgotPassword", "passwordReset", "signin", "signup"].includes(route as string)) {
      const AuthPage = dynamic(() => import(`@component/authManagement/${route}`));
      setComponent(<AuthPage />);
    } else {
      setInvalidRoute(true);
    }
  }, []);

  return invalidRoute ? <ErrorPage statusCode={404} /> : <LayoutContainer component={component} />;
};

export default Page;
