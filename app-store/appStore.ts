import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({ reducer: rootReducer });

export default appStore;
