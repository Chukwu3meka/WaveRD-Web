import "@source/scss/global-style.scss";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "@store";
import LayoutContainer from "@component/layouts";

export default (props: AppProps) => (
  <Provider store={store}>
    <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <LayoutContainer {...{ ...props, store }} />
    </SnackbarProvider>
  </Provider>
);
