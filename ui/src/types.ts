export enum MessengerTypeIds {
    user,
    actor,
}

export interface ChatSnackbar {
    isOpen?: boolean,
    duration?: number,
    message: string,
}