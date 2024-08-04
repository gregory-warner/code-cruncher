import {Dialog} from "../../types";

export interface ActorPrompt {
    actorId: number;
    prompt: string;
}

export interface ServerResponse {
    msg: string;
}

export interface UpdateActorInput {
    name: string;
    title: string;
    messageCard: string;
    prompt: string;
    avatar: File|string;
    ttsModel: string;
    chatModel: string;
    actorId: number;
}

export interface DialogsResponse {
    dialogs: Dialog[];
}

export interface DialogsRequest {
    userId: number;
    actorId: number;
}

export interface CreateDialogResponse {
    dialogId: number;
}