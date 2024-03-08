import { useEffect } from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@source/theme";
import Layout from "@component/layout";
import { useStore } from "@store/index";
import createEmotionCache from "@source/createEmotionCache";

import { SnackbarProvider } from "notistack";

import "@source/code-highlight.scss";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider maxSnack={1} preventDuplicate>
          <Layout {...{ pageProps, Component, store }} />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
