import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface ChatAppState {
    isLoading: boolean,
}

const initialState: ChatAppState = {
    isLoading: false,
};

export const ChatAppSlice = createSlice({
    name: "chatApp",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = !!action.payload;
        },
    },
});

export const { setIsLoading } = ChatAppSlice.actions;

export const selectIsLoading = (state: RootState) => state.chatApp.isLoading;

export default ChatAppSlice.reducer;