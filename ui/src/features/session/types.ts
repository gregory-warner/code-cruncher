import {
    Actor,
    ChatResponse,
    Message,
    SessionParticipant,
    SessionParticipantType,
    User
} from "../../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

export interface ChatService {
    chat(messages: Message[]): ThunkAction<any, any, any, AnyAction>;
    getResponseContent: (response: ChatResponse) => string;
}

export type Messenger = User | Actor;
export type Speaker = SessionParticipant;

export interface SessionStatus {
    isLoading: boolean;
    currentSequenceId: number;
    currentSpeaker: Speaker;
    selectedParticipant: SessionParticipantType;
    score: Score;
}

export interface UpdateSessionIsLoading {
    sessionId: number;
    isLoading: boolean;
}

export interface UpdateSessionCurrentSpeaker {
    sessionId: number;
    currentSpeaker: Speaker;
}

export interface UpdateSelectedParticipant {
    sessionId: number;
    participant: SessionParticipantType;
}

export interface Score {
    correct: number;
    incorrect: number;
}

export interface UpdateSessionScore {
    sessionId: number;
    score: Score;
}