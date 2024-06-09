import { AxiosResponse } from 'axios';
import { apiClient } from './utils/apiClient';

/* Users */
export const getActiveUser = async (username: string): Promise<AxiosResponse<User>> => {
    return await apiClient.get(`users/getUser/${username}`);
};

/* Assitant */
export const getActiveAssistant = async (username: string): Promise<AxiosResponse<Actor>> => {
    return await apiClient.get(`actors/getAssistant/${username}`);
};

export const fetchActiveAssistants = async () => {
    return await apiClient.get("actors/getActiveAssistants");
};

/* Actor */
export const getActiveActor = async (username: string): Promise<AxiosResponse<Actor>> => {
    return await apiClient.get(`actors/getActor/${username}`);
};

export const getActiveActors = async (): Promise<AxiosResponse<Actor[]|null>> => {
    return await apiClient.get(`actors/getActiveActors`);
};

/* Actor Configuration */
export const updateChatModel = async (actorChatModel: ActorModel): Promise<void> => {
    await apiClient.patch(`actorConfigurations/updateChatModel`, actorChatModel);
}

export const getConfig = async (actorId: number): Promise<AxiosResponse<ActorConfiguration>> => {
    return await apiClient.get(`actorConfigurations/getConfig/${actorId}`);
}

export const updateTtsModel = async (actorModel: ActorModel): Promise<void> => {
    await apiClient.patch(`actorConfigurations/updateTtsModel`, actorModel);
}

export const updatePrompt = async (actorPrompt: ActorPrompt): Promise<void> => {
    await apiClient.post(`prompts/updatePrompt`, actorPrompt)
};

/* Dialog */
export const getDialogId = async (actorId: number, userId: number): Promise<AxiosResponse<number>> => {
    return await apiClient.get(`dialogs/getDialogId`, {
        params: { actorId, userId }
    });
};

export const createDialog = async (actorId: number, userId: number): Promise<AxiosResponse<{dialogId: number}>> => {
    return await apiClient.post(`dialogs/createDialog`, {actorId, userId});
};

export const deleteDialog = async (dialogId: number): Promise<void> => {
    await apiClient.patch(`dialogs/deleteDialog/${dialogId}`)
};

/* Message */
export const getMessagesByDialogId = async (dialogId: number): Promise<AxiosResponse<Message[]>> => {
    return await apiClient.get(`messages/getMessages/${dialogId}`);
};

export const addMessageToDialog = async (message: Message): Promise<AxiosResponse<Message>> => {
    return await apiClient.post(`messages/addMessage`, {message});
};

export const getMessengerByType = async (messengerType: MessengerType): Promise<AxiosResponse<User|Actor>> => {
    return await apiClient.get(`messages/getMessenger`, {
        params: {
            messengerId: messengerType.id,
            messengerType: messengerType.type
        }
    })
}

export const deleteMessage = async (messageId: number): Promise<AxiosResponse<null>> => {
    return await apiClient.patch(`messages/deleteMessage`, { messageId });
}