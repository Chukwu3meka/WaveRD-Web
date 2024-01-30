import "@styles/scss/global-style.scss";

import { SWRConfig, SWRConfiguration } from "swr";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "@store";
import LayoutContainer from "@component/layouts";

const swrConfigOptions: SWRConfiguration = {};

export default (props: AppProps) => (
  <Provider store={store}>
    <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <SWRConfig value={swrConfigOptions}>
        <LayoutContainer {...{ ...props, store }} />
      </SWRConfig>
    </SnackbarProvider>
  </Provider>
);
