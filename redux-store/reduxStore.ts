import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const reduxStore = configureStore({ reducer: rootReducer });

export default reduxStore;
