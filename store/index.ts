import { useMemo } from "react";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

// Define the type for the store state
export type RootState = ReturnType<typeof rootReducer>;

let store: ReturnType<typeof initStore> | undefined;

function initStore(initialState: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: true,
  });
}

export const initializeStore = (preloadedState?: RootState) => {
  let _store = store ?? initStore(preloadedState ?? undefined);
  // let _store = store ?? initStore(preloadedState);

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

// export function useStore(initialState: RootState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }

export function useStore(initialState?: any) {
  // const store = useMemo(() => initializeStore(initialState ?? undefined), [initialState]);
  // return store;

  // export function useStore(initialState: typeof store) {
  const store = useMemo(() => initializeStore(initialState || {}), [initialState]);
  return store;
  // }
}

// import { useMemo } from "react";
// import rootReducer from "./reducers";
// import { configureStore } from "@reduxjs/toolkit";

// let store: any;

// function initStore(initialState: typeof store) {
//   return configureStore({ reducer: rootReducer, preloadedState: initialState, devTools: true });
// }

// export const initializeStore = (preloadedState: typeof store) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === "undefined") return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState: typeof store) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
