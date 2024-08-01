import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {EditableActor} from "../actorDrawer/types";

export interface ChatDashboardState {
    selectedActor?: EditableActor|null,
}

const initialState: ChatDashboardState = {
};

export const chatDashboardSlice = createSlice({
    name: "chatDashboard",
    initialState,
    reducers: {
        setSelectedActor: (state, action: PayloadAction<EditableActor|null>) => {
            state.selectedActor = action.payload
        },
    },
});

export const { setSelectedActor } = chatDashboardSlice.actions;

export const selectSelectedActor = (state: RootState) => state.chatDashboard.selectedActor;

export default chatDashboardSlice.reducer;