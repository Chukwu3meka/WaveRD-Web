import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import LayoutContainer from "@component/main/auth/authLayout";
import BuilderLoading from "@component/builder/loading";
import { sleep } from "@utils/handlers";

const Page = () => {
  const router = useRouter();
  const { page } = router.query;
  const [component, setComponent] = useState(<></>);
  const [invalidRoute, setInvalidRoute] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateRoute = async () => {
      // ? Verify that user has visited a valid auth page

      if (["emailConfirmation", "forgotPassword", "passwordReset", "signin", "signup"].includes(page as string)) {
        console.log("AuthPage");
        const AuthPage = await dynamic(() => import(`@component/main/auth/${page}`));
        setComponent(<AuthPage />);
        await sleep(2).then(() => setLoading(false)); // <= signin page tooke time to display, let's let the user know its loading
      } else {
        setLoading(false);
        setInvalidRoute(true);
      }
    };

    validateRoute();
  }, []);

  // return <BuilderLoading />;
  // if (loading) return <BuilderLoading />;

  if (invalidRoute) return <ErrorPage statusCode={404} />;

  return loading ? <BuilderLoading /> : <LayoutContainer component={component} />;
};

export default Page;
