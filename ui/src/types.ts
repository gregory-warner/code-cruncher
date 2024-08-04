export enum MessengerTypeIds {
    user,
    actor,
}

export interface ChatSnackbar {
    isOpen?: boolean,
    duration?: number,
    message: string,
}

export interface Dialog {
    dialogId: number;
    dialogName: string;
    userId: number;
    actorId: number;
    timeCreated: number;
    isDeleted: boolean;
}
