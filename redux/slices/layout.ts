import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { LayoutState } from "@interface/slices/layout";

// Define the initial state using that type
const initialState: LayoutState = {
  deviceWidth: 0,
  deviceHeight: 0,
  activeRoute: "/",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState, // <= `createSlice` will infer the state type from the `initialState` argument
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1;
    // },

    // Use the PayloadAction type to declare the contents of `action.payload`
    setDeviceSize: (state, action: PayloadAction<{ deviceWidth: number; deviceHeight: number }>) => {
      state.deviceHeight = action.payload.deviceHeight;
      state.deviceWidth = action.payload.deviceWidth;
    },

    setActiveRoute: (state, action: PayloadAction<string>) => {
      state.activeRoute = action.payload;
    },
  },
});

export const { setDeviceSize, setActiveRoute } = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default layoutSlice.reducer;
