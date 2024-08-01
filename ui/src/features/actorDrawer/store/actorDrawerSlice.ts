import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../../store/store";

export interface ActorCreationDrawerState {
    isOpen: boolean,
}

const initialState: ActorCreationDrawerState = {
    isOpen: false,
};

export const actorDrawerSlice = createSlice({
    name: "actorCreationDrawer",
    initialState,
    reducers: {
        setIsActorCreationDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const {
    setIsActorCreationDrawerOpen,
} = actorDrawerSlice.actions;

export const selectIsActorCreationDrawerOpen = (state: RootState) => state.actorCreationDrawer.isOpen;

export default actorDrawerSlice.reducer;