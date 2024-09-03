import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store/store";

type ThemeModes = 'dark' | 'light';

export interface ThemeState {
    mode: ThemeModes;
}

const initialState: ThemeState = {
    mode: 'dark',
};
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeModes>) => {
            state.mode = action.payload;
        }
    },
});

export const { setMode } = themeSlice.actions;

export const selectMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;