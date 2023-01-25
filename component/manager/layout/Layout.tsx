import Head from "next/head";
import { Box } from "@mui/material";
import { Provider } from "react-redux";

import theme from "@utils/theme";
import { styles } from ".";
// import Spinner from "@component/builder/loading/BuilderLoading";

const Layout = ({ pageProps, Component, store, pageLoading, appReady, auth, smallScreen }: any) => (
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
    <Provider store={store}>
      <Box className={styles.layout}>
        <main style={{ position: "relative" }}>{/* {!appReady ? <Spinner /> : pageLoading ? <Spinner /> : <Component {...pageProps} />} */}</main>
      </Box>
    </Provider>
  </>
);

export default Layout;
