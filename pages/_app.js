import PropTypes from "prop-types";
import { useEffect } from "react";

import { useStore } from "@store/index";
import LayoutContainer from "@component/layout";

import createEmotionCache from "@source/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  // }, []);

  return <LayoutContainer {...{ pageProps, Component, store, emotionCache }} />;
};

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
