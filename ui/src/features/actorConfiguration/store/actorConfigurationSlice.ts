import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../store/store";

export interface ActorConfigurationState {
    selectedActor: Actor|null;
}

const initialState: ActorConfigurationState = {
    selectedActor: null,
};

export const actorConfigurationSlice = createSlice({
    name: 'actorConfiguration',
    initialState,
    reducers: {
        setSelectedActor: (state, action: PayloadAction<Actor>) => {
            state.selectedActor = action.payload;
        }
    },
});

export const {
    setSelectedActor
} = actorConfigurationSlice.actions;

export const selectSelectedActor = (state: RootState) => state.actorConfiguration.selectedActor;

export default actorConfigurationSlice.reducer;