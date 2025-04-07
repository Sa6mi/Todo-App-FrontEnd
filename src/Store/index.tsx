import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import snackbarReducer from "./Slices/SnackbarSlice";

export const store = configureStore({

  reducer: {
    auth:authReducer,
    snackbar:snackbarReducer
  }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
    