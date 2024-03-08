import Head from "next/head";
import { useEffect } from "react";
import { connect, Provider } from "react-redux";

import Paper from "@mui/material/Paper";
import { Header, Footer, styles } from ".";
import { setDeviceWidthAction } from "@store/actions";

const Layout = ({ pageProps, Component, store, setDeviceWidthAction }) => {
  useEffect(() => {
    setDeviceWidthAction(window.innerWidth);
  }, []);

  return (
    <>
      <Head>
        <title>Soccer Atlas</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="rgb(30, 57, 82)" />
        <meta property="og:url" content="https://www.soccerAtlass.vercel.app/" />
        <meta name="keywords" content="Soccer Atlas" />
        <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Soccer Atlas" />
        <meta property="og:title" content="Soccer Atlas" />
        <meta property="og:description" content="Soccer Atlas" />
      </Head>
      <Provider store={store}>
        <div className={styles.layout}>
          <Header />
          <Paper elevation={2}>
            <Component {...pageProps} />
          </Paper>
          <Footer />
        </div>
      </Provider>
    </>
  );
};

const mapStateToProps = (state) => ({
    error: state.error,
  }),
  mapDispatchToProps = {
    setDeviceWidthAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
