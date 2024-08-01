import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store/store";

export interface ThemeState {
    mode: string,
}

const initialState: ThemeState = {
    mode: 'dark',
};
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
        }
    },
});

export const { setMode } = themeSlice.actions;

export const selectMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;