import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import {defaultCardStyle} from "./types";

interface MessageCardState {
    messenger: Messenger|null,
    cardStyle: MessageCardStyle,
}

const initialState: MessageCardState = {
    messenger: null,
    cardStyle: defaultCardStyle
};

export const messageCardSlice = createSlice({
    name: "messageCard",
    initialState,
    reducers: {
        setCardStyle: (state) => {
            state.cardStyle = state.messenger.configuration?.colorTheme?.messageCard ?? defaultCardStyle;
        },
    }
});

export const {  } = messageCardSlice.actions;

export const selectMessenger = (state: RootState) => state.messageCard.messenger;

export const selectCardStyle = (state: RootState) => state.messageCard.cardStyle;

export default messageCardSlice.reducer;