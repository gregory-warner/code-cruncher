import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface ChatDashboardState {
    selectedActor?: Actor,
}

const initialState: ChatDashboardState = {
};

export const chatDashboardSlice = createSlice({
    name: "chatDashboard",
    initialState,
    reducers: {
        setSelectedActor: (state, action: PayloadAction<Actor>) => {
            state.selectedActor = action.payload
        },
    },
});

export const { setSelectedActor } = chatDashboardSlice.actions;

export const selectSelectedActor = (state: RootState) => state.chatDashboard.selectedActor;

export default chatDashboardSlice.reducer;