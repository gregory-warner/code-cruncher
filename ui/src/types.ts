export enum ParticipantTypeId {
    user,
    actor,
}

export type MessengerType = Actor | User | null;

export enum ModelType {
    language,
    image,
    text,
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
    languageModel?: LanguageModel;
}

export interface LanguageModel {
    languageModelId: number;
    modelId: number;
    maxTokens: number;
    temperature: number;
    frequencyPenalty: number;
    createdAt: string;
    updatedAt: string;
}

export interface Actor {
    actorId: number;
    name: string;
    username: string;
    avatar: string;
    colorTheme: ColorTheme;
    title: string;
    promptId: number;
    modelId: number;
    modelTypeId: ModelType;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    prompt_id: number;
    model_id: number;
    prompt: Prompt;
    aiModel: AIModel;
}

export interface MessageCard {
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

export interface ColorTheme {
    messageCard: MessageCard;
}

export interface Message {
    messageId: number;
    sessionId: number;
    messageTypeId: number;
    messageLinkId: number;
    sessionParticipantId: number;
    content: string;
    data?: any;
    isLocked: boolean;
    messenger: MessengerType;
    messengerTypeId: number;
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
    participant: SessionParticipantType;
}

export enum MessageTypeId {
    general = 0,
    question = 1,
    answer = 2,
}

export enum MessageContentType {
    general,
    code,
}

export interface ParsedMessage {
    lang?: string;
    type: MessageContentType;
    content: string;
}

export enum SessionType {
    General = 0,
    TypeScript = 1,
    Python = 2,
    Rust = 3,
    MySQL = 4,
    PHP = 5,
    JavaScript
}