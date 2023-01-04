import { useMemo } from "react";
// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

let store: any;

function initStore(initialState: typeof store) {
  // return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

  return configureStore(
    {
      reducer: rootReducer,
      preloadedState: initialState,
      devTools: true,

      // middleware:thunkMiddleware
    }
    //   {

    //   reducer: { counter: counterReducer },
    // }
  );
}

export const initializeStore = (preloadedState: typeof store) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: typeof store) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
