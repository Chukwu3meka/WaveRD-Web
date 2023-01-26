import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import LayoutContainer from "@component/main/auth/authLayout";

const Page = () => {
  const router = useRouter();
  const { page } = router.query;
  const [component, setComponent] = useState(<></>);
  const [invalidPage, setInvalidPage] = useState(false);

  useEffect(() => {
    // ? Verify that user has visited a valid auth page
    if (["emailConfirmation", "forgotPassword", "passwordReset", "signin", "signup"].includes(page as string)) {
      const AuthPage = dynamic(() => import(`@component/main/auth/${page}`));

      setComponent(<AuthPage />);
    }
  }, []);

  return invalidPage ? <ErrorPage statusCode={404} /> : <LayoutContainer component={component} />;
};

export default Page;
