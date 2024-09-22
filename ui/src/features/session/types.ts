import {Actor, Message, User} from "../../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

export interface ChatService {
    chat(messages: Message[]): ThunkAction<any, any, any, AnyAction>;
    getResponseContent: any;
}

export type Messenger = User | Actor;
export type Speaker = Messenger | null;

export interface SessionStatus {
    isLoading: boolean;
    currentSequenceId: number;
    currentSpeaker: Speaker;
}

export type PartialSessionStatus = Partial<SessionStatus>;

export interface UpdateSessionStatus {
    sessionId: number;
    sessionStatus: PartialSessionStatus;
}

export interface UpdateSessionIsLoading {
    sessionId: number;
    isLoading: boolean;
}

export interface UpdateSessionCurrentSpeaker {
    sessionId: number;
    currentSpeaker: Speaker;
}

export interface UpdateSessionTypeId {
    sessionId: number;
    sessionTypeId: number;
}