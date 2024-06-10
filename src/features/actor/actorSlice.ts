import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getActiveActors, getActiveAssistant } from '../../api/server';
import {updateDialog} from "../conversation/store/conversationSlice";

interface ActorState {
    actor: Actor|null,
}

export const defaultActor = "opean";

const initialState: ActorState = {
    actor: null,
};

export const isActor = (actor: Actor | null): actor is Actor => {
    return actor && typeof actor !== 'undefined';
};

export const ActorSlice = createSlice({
    name: "actor",
    initialState, 
    reducers: {
        setAssistant: (state, action: PayloadAction<Actor>) => {
            state.actor = action.payload ?? initialState.actor;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateDialog.fulfilled, (state: ActorState, action) => {
            state.actor = action.payload.actor;
        });
    }
});

export const { setAssistant } = ActorSlice.actions;

export const updateAssistant = createAsyncThunk<void, string>("actors/updateAssistant", async (username: string, { dispatch }) => {
    const assistant: Actor|null = await getAssistantByUsername(defaultActor);
    if (!isActor(assistant)) {
        return;
    }

    dispatch(setAssistant(assistant));
});

/* Actor */

export const getAssistantByUsername = async (username: string) => {
    const response = await getActiveAssistant(username);
    return response.data;
};

export const selectActor = (state: RootState): Actor => {
    return state.actor.actor;
};

export default ActorSlice.reducer;