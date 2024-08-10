import { AxiosResponse } from 'axios';
import { apiClient } from './utils/apiClient';

/* Dialog */
export const getDialogId = async (actorId: number, userId: number): Promise<AxiosResponse<number>> => {
    return await apiClient.get(`dialogs/getDialogId`, {
        params: { actorId, userId }
    });
};

export const createDialog = async (actorId: number, userId: number): Promise<AxiosResponse<{dialogId: number}>> => {
    return await apiClient.post(`dialogs/createDialog`, {actorId, userId});
};

