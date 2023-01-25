import Head from "next/head";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { styles } from ".";
import theme from "@libs/theme";
import FooterContainer from "@component/main/footer";
import HeaderContainer from "@component/main/header";
import BuilderLoading from "@component/builder/loading";
import { ILayout } from "@interface/main/layout-interface";

const Layout = ({ pageProps, Component, store, pageLoading, appReady, emotionCache, displayHeader }: ILayout) => (
  <>
    <Head>
      <title>SoccerMASS: No. 1 Soccer Manager and Football API Provider</title>
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
      <meta property="og:image" content="/images/layout/soccermass.webp" />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <meta property="og:url" content="https://www.soccermass.com/" />
      <meta name="keywords" content="soccer manager, football manager" />
      <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="SoccerMASS: No 1. Free Online Soccer Manager" />
      <meta property="og:title" content={`SoccerMASS: Soccer Manager ${new Date().getFullYear()}`} />
      <meta
        property="og:description"
        content="SoccerMASS is the No 1. Online Football Management Game and Fooftball data API Provider. Advanced formations and tactics, realistic transfer market and much more"
      />
    </Head>

    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <SnackbarProvider maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <Provider store={store}>
            <main className={styles.layout}>
              <HeaderContainer displayHeader={displayHeader} />
              <div>
                <BuilderLoading loading={!appReady || pageLoading} component={<Component {...pageProps} />} />
                <FooterContainer />
              </div>
            </main>
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  </>
);

export default Layout;
