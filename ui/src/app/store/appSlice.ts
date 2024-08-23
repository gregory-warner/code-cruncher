import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CruncherSnackbar} from "../../types";
import {RootState} from "../../store/store";

export interface AppState {
    snackbar: CruncherSnackbar,
}

const initialState: AppState = {
    snackbar: {
        isOpen: false,
        message: '',
        duration: 4000,
    },
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSnackbar: (state, action: PayloadAction<CruncherSnackbar>) => {
            state.snackbar = {
                isOpen: action.payload.isOpen ?? true,
                duration: action.payload.duration ?? 4000,
                message: action.payload.message,
            };
        },
    },
});


export const {
    setSnackbar,
} = appSlice.actions;

export const selectSnackbar = (state: RootState) => state.app.snackbar;

export default appSlice.reducer;