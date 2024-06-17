import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../../store/store";

export interface ActorCreationDrawerState {
    isOpen: boolean,
}

const initialState: ActorCreationDrawerState = {
    isOpen: false,
};

export const actorCreationDrawerSlice = createSlice({
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
} = actorCreationDrawerSlice.actions;

export const selectIsActorCreationDrawerOpen = (state: RootState) => state.actorCreationDrawer.isOpen;

export default actorCreationDrawerSlice.reducer;