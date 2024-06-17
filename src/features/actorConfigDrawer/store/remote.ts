import {createAsyncThunk} from "@reduxjs/toolkit";
import {getConfig, updateChatModel, updateTtsModel} from "../../../api/server";
import {setCurrentModel, setCurrentTtsModel} from "./actorConfigDrawerSlice";
import {apiClient} from "../../../api/server/utils/apiClient";
import {ActorTitle} from "../types";

/* Chat Model */
export const updateAssistantChatModel = createAsyncThunk<void, ActorModel>("actorConfiguration/updateChatModel", async (actorChatModel: ActorModel, { dispatch, getState }) => {
    await updateChatModel(actorChatModel);
    dispatch(setCurrentModel(actorChatModel.model));
});

export const updateInitialChatModel = createAsyncThunk<void, number>("actorConfiguration/getChatModel", async (actorId: number, { dispatch }) => {
    const response = await getConfig(actorId);
    const config = response.data;
    dispatch(setCurrentModel(config.chatModel ?? ""));
});

/* TTS Model */
export const updateAssistantTtsModel = createAsyncThunk<void, ActorModel>("actorConfiguration/updateTtsModel", async (actorTtsModel: ActorModel, { dispatch }) => {
    await updateTtsModel(actorTtsModel);
    dispatch(setCurrentTtsModel(actorTtsModel.model));
});

export const updateInitialTtsModel = createAsyncThunk<void, number>("actorConfiguration/getTtsModel", async (actorId: number, { dispatch }) => {
    const response = await getConfig(actorId);
    const config = response.data;
    dispatch(setCurrentTtsModel(config.ttsModel ?? ""));
});

export const updateActorTitle = createAsyncThunk<void, ActorTitle>("actorConfiguration/updateTitle", async (actorTitle: ActorTitle) => {
    await apiClient.post('actorConfigurations/updateTitle', actorTitle);
});