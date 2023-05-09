import { configureStore } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";

import * as actions from "./actions";
import rootReducer from "./reducers";

export const store = configureStore({ reducer: rootReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const mapState = (state: RootState) => ({
  auth: state.auth,
  error: state.error,
  layout: state.layout,
});

const mapDispatch = actions;

export const connector = connect(mapState, mapDispatch);

export type ConnectorProps = ConnectedProps<typeof connector>;
