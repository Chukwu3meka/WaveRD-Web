import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import "@source/scss/global-style.scss";
import { useStore } from "@store/index";
import LayoutContainer from "@component/layout";

const App = (props: AppProps) => {
  const store = useStore(props.pageProps.initialReduxState);

  return (
    <>
      <LayoutContainer {...{ ...props, store }} />
      <Analytics />
    </>
  );
};

export default App;
