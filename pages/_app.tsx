import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
// import theme from "../src/theme";
// import createEmotionCache from "../src/createEmotionCache";

// import PropTypes from "prop-types";
// import { useEffect } from "react";

import LayoutContainer from "@component/main/layout";
import { useStore } from "@store/index";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { CacheProvider } from "@emotion/react";
import theme from "@source/theme";
import createEmotionCache from "@source/createEmotionCache";
// import config from "react-reveal/globals";

import { SnackbarProvider } from "notistack";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider maxSnack={3} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <LayoutContainer {...{ pageProps, Component, store }} />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
