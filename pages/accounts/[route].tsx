import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carousel from "nuka-carousel/lib/carousel";

import { logoutAction } from "@store/actions";
import { RelativeHeader } from "@component/layout/header";
import authSlideText from "@source/constants/authSlideText";
import styles from "@source/scss/accountStyles.module.scss";

const Page = () => {
  const router = useRouter(),
    { route } = router.query,
    [component, setComponent] = useState(<></>),
    [invalidRoute, setInvalidRoute] = useState(false),
    [pageTitle, setPageTitle] = useState<string>("");

  useEffect(() => {
    // ? Verify that user has visited a valid auth route
    if (validRoutes.map(({ path }) => path).includes(route as string)) {
      const AuthPage = dynamic(() => import(`@component/accounts/${route}`));
      setComponent(<AuthPage />);
      setPageTitle(validRoutes.find(({ path }) => path === route)?.label || "");
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

      <div className={styles.layout}>
        <div>
          <aside>
            <div>
              <Carousel wrapAround={true} slidesToShow={1} autoplay={true} withoutControls={true} adaptiveHeight={true} autoplayInterval={5000}>
                {authSlideText.map((slideText: any) => (
                  <div key={slideText}>{slideText}</div>
                ))}
              </Carousel>
            </div>
          </aside>
          <main>
            <RelativeHeader theme="light" />
            {component}
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(Page);

const validRoutes = [
  { path: "emailConfirmation", label: "Email Confirmation" },
  { path: "forgotPassword", label: "Forgot Password" },
  { path: "signin", label: "Signin" },
  { path: "signup", label: "Signup" },
];
