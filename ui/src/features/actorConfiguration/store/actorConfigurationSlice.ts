import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../store/store";
import {EditableActor} from "../../../types";

export const defaultActor: EditableActor = {
    actorId: 0,
    name: '',
    username: '',
    avatar: '',
    title: '',
    colorTheme: {
        messageCard: {
            nameColor: '',
            contentsColor: '',
            backgroundColor: '',
            borderColor: '',
            borderRadius: '',
            border: '',
            transition: '',
            boxShadow: '',
            width: '',
            textColor: '',
        }
    },
}

export interface ActorConfigurationState {
    selectedActor?: null|EditableActor;
    isEditing: boolean;
}

const initialState: ActorConfigurationState = {
    selectedActor: null,
    isEditing: false,
};

export const actorConfigurationSlice = createSlice({
    name: 'actorConfiguration',
    initialState,
    reducers: {
        setSelectedActor: (state, action: PayloadAction<EditableActor>) => {
            state.selectedActor = action.payload;
        },
        setIsEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
    },
});

export const {
    setSelectedActor,
    setIsEditing,
} = actorConfigurationSlice.actions;

export const selectSelectedActor = (state: RootState) => state.actorConfiguration.selectedActor;
export const selectIsEditing = (state: RootState) => state.actorConfiguration.isEditing;

export default actorConfigurationSlice.reducer;