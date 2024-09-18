import {Actor, Message, SessionParticipantType, User} from "../../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

export interface ChatService {
    chat(messages: Message[]): ThunkAction<any, any, any, AnyAction>;
    getMessageResponse: any;
}

export type Messenger = User | Actor;

export interface SessionStatus {
    isLoading: boolean;
    currentSequenceId: number;
    participants: SessionParticipantType[];
}

type PartialSessionStatus = Partial<SessionStatus>;

export interface UpdateSessionStatus {
    sessionId: number;
    sessionStatus: PartialSessionStatus;
}

