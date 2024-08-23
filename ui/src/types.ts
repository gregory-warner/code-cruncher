export enum MessengerTypeIds {
    user,
    actor,
}

export interface CruncherSnackbar {
    isOpen?: boolean;
    duration?: number;
    message: string;
}

export interface Prompt {
    promptId: number;
    promptName: string;
    prompt: string;
    postfix: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null | string;
}

export interface AIModel {
    modelId: number;
    modelTypeId: number;
    modelName: string;
    modelIdentifier: string;
    isLocal: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Actor {
    actorId: number;
    name: string;
    username: string;
    avatar: string;
    colorTheme: string;
    title: string;
    promptId: number;
    modelId: number;
    modelTypeId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    prompt_id: number;
    model_id: number;
    prompt: Prompt;
    aiModel: AIModel;
}

export interface ColorTheme {
    nameColor: string;
    contentsColor: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    border: string;
    transition: string;
    boxShadow: string;
    width: string;
    "&:hover": {
        boxShadow: string;
        transform: string;
    };
    textColor: string;
}

export interface Message {
    messageId: number;
    sessionId: number;
    messageTypeId: number;
    messageLinkId: number;
    messengerId: number;
    content: string;
    data?: any;
    isLocked: boolean;
}

export interface Session {
    sessionId: number;
    sessionName: string;
    sessionTypeId: number;
    createdBy: number;
    deletedAt?: Date | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export enum SessionType {
    code = 0,
    chat = 1,
}

export interface User {
    userId: number;
    name: string;
    username: string;
    avatar: string;
    colorTheme?: ColorTheme;
}


export type SessionParticipantType = Actor | User;

export interface SessionParticipant {
    sessionParticipantId?: number;
    sessionId: number;
    participantId: number;
    participantTypeId: number;
    participantSequence: number;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export enum MessageTypeId {
    general = 0,
    question = 1,
    answer  ,
}