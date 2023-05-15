import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter(),
    { route } = router.query,
    [component, setComponent] = useState(<></>),
    [invalidRoute, setInvalidRoute] = useState(false),
    [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    // ? Verify that user has visited a valid auth route
    const isRouteValid = validRoutes.find((validRoute) => validRoute.path === route);

    if (isRouteValid) {
      const AuthPage = dynamic(() => import(`@component/accounts/${isRouteValid.component}`));
      setComponent(<AuthPage />);
      setPageTitle(isRouteValid.title);
    } else {
      setInvalidRoute(true);
    }
  }, []);

  return invalidRoute ? (
    <ErrorPage statusCode={404} />
  ) : (
    <>
      <Head>
        <title>SoccerMASS {pageTitle}</title>
        <meta name="description" content={`SoccerMASS ${pageTitle}`} />
        <meta property="og:description" content={`SoccerMASS ${pageTitle}`} />
        <meta name="keywords" content={`${pageTitle.toLowerCase()}, soccer manager, soccer, soccermass, football manager, football`} />
      </Head>

      {component}
    </>
  );
};

export default Page;

const validRoutes = [
  { path: "signin", title: "Sign In", component: "signin" },
  { path: "signup", title: "Sign Up", component: "signup" },
  { path: "forgot-password", title: "Forgot Password", component: "forgotPassword" },
  { path: "reset-password", title: "Reset Password", component: "resetPassword" },
  { path: "email-verification-success", title: "Email Verification Success", component: "emailVerificationSuccess" },
  { path: "email-verification-failed", title: "Email Verification Failed", component: "emailVerificationFailed" },
];
