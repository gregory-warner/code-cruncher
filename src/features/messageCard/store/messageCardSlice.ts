import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { messengerTypeIds } from "../../conversation/store/conversationSlice";
import {defaultCardStyle} from "./types";

interface MessageCardState {
    messenger: Messenger|null,
    messengerCache: MessengerCache,
    cardStyle: MessageCardStyle,
}

const initialState: MessageCardState = {
    messenger: null,
    messengerCache: {},
    cardStyle: defaultCardStyle
};

export const messageCardSlice = createSlice({
    name: "messageCard",
    initialState,
    reducers: {
        setCardStyle: (state) => {
            state.cardStyle = state.messenger.configuration?.colorTheme?.messageCard ?? defaultCardStyle;
        },
        addUserMessenger: (state, action: PayloadAction<User>) => {
            const type = messengerTypeIds.user.toString();
            let messengerCacheType = state.messenger?.[type] ?? {};
            messengerCacheType[action.payload.userId.toString()] = action.payload;
            state.messengerCache[type] = messengerCacheType;
        },
        setMessengerCache: (state, action: PayloadAction<MessengerCache>) => {
            state.messengerCache = action.payload;
        }
    }
});

export const {addUserMessenger, setMessengerCache } = messageCardSlice.actions;

export const addAssistantToCache = createAsyncThunk<void, Actor>("message/addAssistantToCache", async (assistant: Actor, { dispatch, getState}) => {
    const state = getState() as RootState;
    const cache = selectMessengerCache(state);

    const newCache = {
        ...cache,
        [messengerTypeIds.assistant]: {
            ...cache[messengerTypeIds.assistant],
            [assistant.actorId]: assistant,
        }
    } as MessengerCache;

    dispatch(setMessengerCache(newCache));
});

export const selectMessenger = (state: RootState) => state.messageCard.messenger;

export const selectMessengerCache = (state: RootState) => state.messageCard.messengerCache;

export const selectCardStyle = (state: RootState) => state.messageCard.cardStyle;

export default messageCardSlice.reducer;