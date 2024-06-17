import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface ActorConfigDrawerState {
    isOpen: boolean,
    models: Model[],
    isPromptDrawerOpen: boolean,
    
    currentModel: string,
    updatedModel: string,
    
    updatededTtsModel: string,
    currentTtsModel: string,

    updatedConfig: ActorConfiguration,
    currentConfig: ActorConfiguration,
}

const initialState: ActorConfigDrawerState = {
    isOpen: false,
    models: [],
    isPromptDrawerOpen: false,
    currentModel: "",
    updatedModel: "",
    updatededTtsModel: "",
    currentTtsModel: "",
    updatedConfig: {
        title: "",
        prompt: "",
        colorTheme: null,
        avatar: "",
        prompts: null,
    },
    currentConfig: {
        title: "",
        prompt: "",
        colorTheme: null,
        avatar: "",
        prompts: null,
    },
};

export const actorConfigDrawerSlice = createSlice({
    name: "actorConfigDrawer",
    initialState,
    reducers: {
        setActorConfigDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        setIsPromptDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isPromptDrawerOpen = action.payload;
        },
        setModels: (state, action: PayloadAction<Model[]>) => {
            state.models = action.payload;
        },
        setCurrentModel: (state, action: PayloadAction<string>) => {
            state.currentModel = action.payload;
        },
        setSelectedModel: (state, action: PayloadAction<string>) => {
            state.updatedModel = action.payload;
        },
        setCurrentTtsModel: (state, action: PayloadAction<string>) => {
            state.currentTtsModel = action.payload;
        },
        setSelectedTtsModel: (state, action: PayloadAction<string>) => {
            state.updatededTtsModel = action.payload;
        },
        setCurrentConfig: (state, action: PayloadAction<ActorConfiguration>) => {
            state.currentConfig = action.payload;
        },
        setSelectedConfig: (state, action: PayloadAction<ActorConfiguration>) => {
            state.updatedConfig = action.payload;
        },
    },
});


export const { 
    setActorConfigDrawerOpen, 
    setIsPromptDrawerOpen,
    setModels, 
    setCurrentModel, 
    setSelectedModel, 
    setSelectedTtsModel, 
    setCurrentTtsModel,
    setSelectedConfig,
    setCurrentConfig,
} = actorConfigDrawerSlice.actions;

export const isOpen = (state: RootState) => state.actorConfigDrawer.isOpen;

export const selectIsPromptDrawerOpen = (state: RootState) => state.actorConfigDrawer.isPromptDrawerOpen;

export const selectModels = (state: RootState) => state.actorConfigDrawer.models;

export const selectCurrentModel = (state: RootState) => state.actorConfigDrawer.currentModel;

export const selectSelectedModel = (state: RootState) => state.actorConfigDrawer.updatedModel;

export const selectSelectedTtsModel = (state: RootState) => state.actorConfigDrawer.updatededTtsModel;

export const selectCurrentTtsModel = (state: RootState) => state.actorConfigDrawer.currentTtsModel;

export const selectCurrentConfig = (state: RootState) => state.actorConfigDrawer.currentConfig;

export const selectSelectedConfig = (state: RootState) => state.actorConfigDrawer.updatedConfig;

export default actorConfigDrawerSlice.reducer;