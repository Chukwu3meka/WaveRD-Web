import "@source/scss/global-style.scss";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

import { store } from "@store";
import LayoutContainer from "@component/layout";

export default (props: AppProps) => (
  <Provider store={store}>
    <LayoutContainer {...{ ...props, store }} />
    <Analytics />
  </Provider>
);
