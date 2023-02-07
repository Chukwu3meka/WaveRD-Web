import { AppProps } from "next/app";

import "@source/scss/global-style.scss";
import { useStore } from "@store/index";
import LayoutContainer from "@component/structure/layout";

const App = (props: AppProps) => {
  const store = useStore(props.pageProps.initialReduxState);

  return <LayoutContainer {...{ ...props, store }} />;
};

export default App;
