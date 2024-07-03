import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

let state = {
  user: {},
};

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    user: userSlice.reducer,
  }),
});
