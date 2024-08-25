import {Prompt, Session} from "../../types";

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

export interface MessageRequest {
    sessionId: number;
    messageTypeId: number;
    messengerId: number;
    messengerTypeId: number;
    content: string;
}
