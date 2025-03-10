import {Actor, AIModel, ColorTheme, MessageEventDetails, MessageQuestionType, Prompt, Session} from "../../types";

export interface ActorPrompt {
    actorId: number;
    prompt: PromptRequest
}

interface PromptRequest extends Partial<Prompt> {
    promptId?: number;
    promptName: string;
    prompt: string;
    postfix: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: null | string;
}

export interface SessionRequest extends Partial<Session> {
    sessionId?: number;
    sessionName: string;
    sessionTypeId: number;
    createdBy: number;
}

export interface SessionParticipantRequest {
    sessionId: number;
    participantId: number;
    participantTypeId: number;
}

export interface SessionNameRequest {
    sessionId: number;
    sessionName: string;
}

export interface AddMessageRequest {
    sessionId: number;
    messageTypeId: number;
    sessionParticipantId: number;
    content: string;
}

export interface UpdatePromptRequest {
    actorId: number;
    prompt: PromptRequest;
}

export interface UpdateAIModelRequest {
    actorId: number;
    aiModel: AIModel;
}

export interface UpdateActorRequest extends Partial<Actor> {}
export interface CreateActorRequest extends Partial<Actor> {}


export interface UpdateAvatarRequest {
    actorId: number;
    formData: FormData;
}

export interface UpdateSessionTypeIdRequest {
    sessionId: number;
    sessionTypeId: number;
}

export interface MessageEventDetailsRequest extends Partial<MessageEventDetails> {
    questionId: number;
    messageId: number;
}

export interface MessageQuestionTypeRequest {
    messageEventId: number;
    questionTypes: string[];
}
