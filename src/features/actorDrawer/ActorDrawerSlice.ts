import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchActiveAssistants } from '../../api/server';
import {isActor, setActor} from '../actor/actorSlice';
import {updateDialog, updateDialogId} from '../conversation/store/conversationSlice';
import { selectUser } from '../user/userSlice';

export interface ActorDrawerState {
    isOpen: boolean,
    actors: Actor[],
    selectedActor?: Actor,
}

const initialState: ActorDrawerState = {
    isOpen: false,
    actors: [],
};

export const fetchActors = createAsyncThunk("actors/getActiveActors", async () => {
    const response = await fetchActiveAssistants();
    return response.data;
});

export const actorDrawerSlice = createSlice({
    name: "actorDrawer",
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen;
        },
        setSelectedActor: (state, action: PayloadAction<Actor>) => {
            if (!isActor(action.payload)) {
                return;
            }
            state.selectedActor = action.payload
        },
        setDrawer: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActors.fulfilled, (state, action) => {
                const actors = action.payload;
                state.actors = [...actors];
            })
      },
});

export const updateActorFromDrawer = createAsyncThunk<void, Actor>("actors/updateAssistant", async (selectedActor: Actor, { dispatch, getState }) => {
    const state = getState() as RootState;

    const user = selectUser(state);
    dispatch(setActor(selectedActor));
    dispatch(setDrawerOpen(false));
    dispatch(updateDialogId({user, actor: selectedActor}));
});

export const { toggleDrawer, setSelectedActor, setDrawer: setDrawerOpen } = actorDrawerSlice.actions;

export const isOpen = (state: RootState) => state.actorDrawer.isOpen;

export const selectSelectedActor = (state: RootState) => state.actorDrawer.selectedActor;

export default actorDrawerSlice.reducer;