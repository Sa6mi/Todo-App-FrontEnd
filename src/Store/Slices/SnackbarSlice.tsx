import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackbarType = "success" | "error" | "info" | "warning";

interface SnackbarPayload {
  message: string;
  type: SnackbarType;
}
interface SnackbarState {
  toggleSnackbar: boolean;
  snackbarMessage: string;
  snackbarType: SnackbarType;
}
const initialState: SnackbarState = {
  toggleSnackbar: false,
  snackbarMessage: "",
  snackbarType: "info",
};
const SnackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    Snackbar_Open: (state, action: PayloadAction<SnackbarPayload>) => {
      state.toggleSnackbar = true;
      state.snackbarMessage = action.payload.message;
      state.snackbarType = action.payload.type;
    },
    Snackbar_Close: (state) => {
      state.toggleSnackbar = false;
      state.snackbarMessage = "";
    },
  },
});

export const { Snackbar_Open, Snackbar_Close } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;
