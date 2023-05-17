import "@source/scss/global-style.scss";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "@store";
import LayoutContainer from "@component/layouts";
import createEmotionCache from "@source/createEmotionCache";

export default (props: AppProps) => (
  <Provider store={store}>
    <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <LayoutContainer {...{ ...props, store }} />
    </SnackbarProvider>
  </Provider>
);
