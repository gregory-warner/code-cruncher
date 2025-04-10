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
    actorId: number;
    promptName: string;
    prompt: string;
    postfix: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null | string;
}

export interface AIModel {
    modelId: number;
    modelTypeId: number;
    modelName: string;
    modelIdentifier: string;
    isLocal: boolean;
    createdAt?: string;
    updatedAt?: string;
    languageModel?: LanguageModel;
}

export interface LanguageModel {
    languageModelId: number;
    modelId: number;
    maxTokens: number;
    temperature: number;
    frequencyPenalty: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface EditableActor extends Partial<Actor> {
    prompt?: null | Prompt;
    aiModel?: null | AIModel;
    colorTheme?: null | ColorTheme;
}

export interface Actor {
    actorId: number;
    name: string;
    username: string;
    avatar: string;
    colorTheme: ColorTheme;
    title: string;
    modelId: number;
    modelTypeId: ModelType;
    createdAt?: string;
    updatedAt?: string;
    deletedAt: null | string;
    prompt: Prompt;
    prompts: Prompt[];
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
    "&:hover"?: {
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
    sessionParticipantId: number;
    content: string;
    messenger: MessengerType;
    messengerTypeId: number;
    messageEventId: number;
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
    deletedAt?: string;
}

export type SessionParticipantType = Actor | User | null;

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
    SQL = 4,
    PHP = 5,
    JavaScript = 6,
    Kotlin = 7,
    Java = 8,
}

export interface MessageEventDetails {
    messageEventId: number;
    messageId: number;
    questionId: number;
    resultId?: number | null;
    duration?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export interface MessageQuestionType {
    messageEventId: number;
    questionType: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export interface ChatResponse {}