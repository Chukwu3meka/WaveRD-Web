import Head from "next/head";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material/styles";
import Spinner from "@component/others/Spinner";

import { Header, FooterContainer, styles, Navigation, NoAuthRoute, Maintainance } from ".";

const Layout = ({
  auth,
  path,
  theme,
  store,
  pageReady,
  Component,
  pageProps,
  scrollRef,
  handleScroll,
  maintainance,
  displayHeader,
  emotionCache,
}) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <title>SoccerMASS: No. 1 football manager for advanced soccer management</title>
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image" content="/images/soccermass.webp" />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta property="og:url" content="https://www.soccermass.com/" />
      <meta name="keywords" content="soccer manager, football manager" />
      <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="SoccerMASS: No 1. Free Online Soccer Manager" />
      <meta property="og:title" content={`SoccerMASS: Soccer Manager ${new Date().getFullYear()}`} />
      <meta
        property="og:description"
        content="SoccerMASS is the No 1. Online Football Management Game. Advanced formations and tactics, realistic transfer market and much more"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <SnackbarProvider maxSnack={1} preventDuplicate>
          <div className={styles.layout}>
            <div onScroll={handleScroll}>
              <Header displayHeader={displayHeader} />
              <div className={styles.content} ref={scrollRef}>
                {["/auth/signup", "/auth/reset", "/auth/verify", "/auth/signin"].includes(path?.split("?")[0]) ? (
                  <NoAuthRoute {...{ Component, pageReady, pageProps, handleScroll }} />
                ) : (
                  <div className={styles.authRoute}>
                    {pageReady ? maintainance ? <Maintainance /> : <Component {...pageProps} /> : <Spinner />}
                  </div>
                )}
              </div>
              <div>
                <FooterContainer maintainance={maintainance} />
              </div>
              {!!auth.club && <Navigation auth={auth} />}
            </div>
          </div>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </CacheProvider>
);

export default Layout;
