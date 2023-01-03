import Head from "next/head";
import { Provider } from "react-redux";

import { styles } from ".";
import theme from "@source/theme";
import BuilderLoading from "@component/builder/loading";

const Layout = ({ pageProps, Component, store, pageLoading, appReady }: any) => (
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
        content="SoccerMASS is the No 1. Online Football Management Game and Fooftball data API Provider. Advanced formations and tactics, realistic transfer market and much more"
      />
    </Head>
    <Provider store={store}>
      <div className={styles.layout}>
        <BuilderLoading status={!appReady || pageLoading} component={<Component {...pageProps} />} />
      </div>
    </Provider>
  </>
);

export default Layout;
