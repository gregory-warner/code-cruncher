import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {getActiveAssistant} from '../../api/server';
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
        setActor: (state, action: PayloadAction<Actor>) => {
            state.actor = action.payload ?? initialState.actor;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateDialog.fulfilled, (state: ActorState, action) => {
            state.actor = action.payload.actor;
        });
    }
});

export const { setActor } = ActorSlice.actions;

export const selectActor = (state: RootState): Actor => {
    return state.actor.actor;
};

export default ActorSlice.reducer;