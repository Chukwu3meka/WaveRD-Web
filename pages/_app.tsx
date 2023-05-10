import "@source/scss/global-style.scss";

import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@store";
import LayoutContainer from "@component/layouts";

export default (props: AppProps) => (
  <Provider store={store}>
    <LayoutContainer {...{ ...props, store }} />
  </Provider>
);
