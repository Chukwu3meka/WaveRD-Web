import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import LayoutContainer from "@component/main/layout";
import { useStore } from "@store/index";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@source/theme";
import createEmotionCache from "@source/createEmotionCache";

import { SnackbarProvider } from "notistack";
import Link from "next/link";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// interface MyAppProps extends AppProps {
//   emotionCache?: EmotionCache;
// }

const App = (props: AppProps) => {
  // const {
  //   Component,
  //   //

  //   // emotionCache = clientSideEmotionCache,
  //   pageProps,
  // } = props;

  const store = useStore(props.pageProps.initialReduxState);
  // return <LayoutContainer {...{ pageProps, Component, store }} />;
  return (
    <>
      <Link href="/">Home</Link>________________
      <Link href="/apihub">API HUB</Link>________________
      <Link href="/manager">Manager</Link>
      <LayoutContainer {...{ ...props, store }} />
    </>
  );
};

export default App;
