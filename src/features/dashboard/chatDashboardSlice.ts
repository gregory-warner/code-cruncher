import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {EditableActor} from "../actorCreationDrawer/types";

export interface ChatDashboardState {
    selectedActor?: EditableActor|null,
}

const initialState: ChatDashboardState = {
};

export const chatDashboardSlice = createSlice({
    name: "chatDashboard",
    initialState,
    reducers: {
        setSelectedActor: (state, action: PayloadAction<EditableActor>) => {
            state.selectedActor = action.payload
        },
    },
});

export const { setSelectedActor } = chatDashboardSlice.actions;

export const selectSelectedActor = (state: RootState) => state.chatDashboard.selectedActor;

export default chatDashboardSlice.reducer;