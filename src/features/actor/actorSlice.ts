import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getActiveActors, getActiveAssistant } from '../../api/server';
import { addAssistantToCache } from '../messageCard/store/messageCardSlice';
import {updateDialog} from "../conversation/store/conversationSlice";

interface ActorState {
    actor: Actor|null,
    actors: Record<number, Actor>,
}

export const defaultActor = "opean";

const initialState: ActorState = {
    actor: null,
    actors: {},
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
        setActors: (state, action: PayloadAction<Record<number, Actor>>) => {
            state.actors = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateDialog.fulfilled, (state: ActorState, action) => {
            state.actor = action.payload.actor;
        });
    }
});

export const { setAssistant, setActors } = ActorSlice.actions;

export const updateAssistant = createAsyncThunk<void, string>("actors/updateAssistant", async (username: string, { dispatch }) => {
    const assistant: Actor|null = await getAssistantByUsername(defaultActor);
    if (!isActor(assistant)) {
        return;
    }

    dispatch(setAssistant(assistant));
    // dispatch(addAssistantToCache(assistant));
});

/* Actor */

export const getAssistantByUsername = async (username: string) => {
    const response = await getActiveAssistant(username);
    return response.data;
};

export const updateActors = createAsyncThunk<void, void>("actor/updateActors", async (_, { dispatch }) => {
    const response = await getActiveActors();

    const actors = Array.isArray(response.data) ? response.data : [];
    if (actors.length === 0) {
        return;
    }

    const actorsRecord = actors.reduce((record, actor) => {
        record[actor.actorId] = actor;
        return record;
    }, {});
    
    dispatch(setActors(actorsRecord));
});


export const selectAssistant = (state: RootState): Actor => {
    return state.actor.actor;
};

export const selectActors = (state: RootState): Record<number, Actor> => {
    return state.actor.actors;
}

export default ActorSlice.reducer;