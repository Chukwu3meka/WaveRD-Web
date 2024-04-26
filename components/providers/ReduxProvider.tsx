"use client";

import appStore from "../../redux-store/reduxStore";

import { Provider } from "react-redux";
import { ReactChildren } from "interfaces/components/shared.interface";

const ReduxProvider = ({ children }: ReactChildren) => <Provider store={appStore}>{children}</Provider>;

export default ReduxProvider;
