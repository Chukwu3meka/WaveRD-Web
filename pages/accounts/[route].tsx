import Head from "next/head";
import ErrorPage from "next/error";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carousel from "nuka-carousel/lib/carousel";

import { logoutAction } from "@store/actions";
import styles from "@source/scss/accounts.module.scss";
import { RelativeHeader } from "@component/layout/header";
import authSlideText from "@source/constants/authSlideText";
import { Fade } from "react-awesome-reveal";

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

      <div className={styles.layout}>
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
          <RelativeHeader theme="light" titleOnly="light" />
          <Fade direction="down" triggerOnce={true} style={{ perspective: "100px" }}>
            {component}
          </Fade>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(Page);

const validRoutes = [
  { path: "signin", title: "Sign In", component: "signin" },
  { path: "signup", title: "Sign Up", component: "signup" },
  { path: "forgot-password", title: "Forgot Password", component: "forgotPassword" },
  { path: "reset-password", title: "Reset Password", component: "resetPassword" },
];
