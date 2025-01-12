import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {Session, SessionParticipant, SessionParticipantType} from "../../types";
import {
    Score,
    SessionStatus,
    Speaker, UpdateSelectedParticipant,
    UpdateSessionCurrentSpeaker,
    UpdateSessionIsLoading, UpdateSessionScore,
    UpdateSessionStatus
} from "./types";

export interface SessionState {
    sessionId: number|null;
    participants: SessionParticipant[];
    currentSpeaker: SessionParticipant | null;
    currentSequenceId: number;
    selectedParticipant: SessionParticipant|null;
    sessionStatuses: {
        [key: number]: SessionStatus;
    },
    session?: Session | null,
}

const initialState: SessionState = {
    sessionId: null,
    participants: [],
    currentSpeaker: null,
    currentSequenceId: 0,
    selectedParticipant: null,
    sessionStatuses: {},
    session: null,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionId: (state, action: PayloadAction<number>) => {
            state.sessionId = action.payload;
        },
        setSession: (state, action: PayloadAction<Session>) => {
            state.session = action.payload;
        },
        setParticipants: (state, action: PayloadAction<SessionParticipant[]>) => {
            state.participants = action.payload;
        },
        addSessionParticipant: (state, action: PayloadAction<SessionParticipant>) => {
            state.participants = [
                ...state.participants,
                action.payload,
            ];
        },
        incrementCurrentSequenceId: (state) => {
            const participantLength = state.participants.length;

            if (participantLength === 0) {
                state.currentSequenceId = 0;
            }

            state.currentSequenceId = (state.currentSequenceId + 1) % participantLength;
        },
        setCurrentSpeaker: (state, action: PayloadAction<SessionParticipant>) => {
            state.currentSpeaker = action.payload;
        },
        updateSessionStatusIsLoading: (state, action: PayloadAction<UpdateSessionIsLoading>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    isLoading: action.payload.isLoading,
                },
            }
        },
        updateSessionStatusCurrentSpeaker: (state, action: PayloadAction<UpdateSessionCurrentSpeaker>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    currentSpeaker: action.payload.currentSpeaker,
                },
            }
        },
        updateSessionSelectedParticipant: (state, action: PayloadAction<UpdateSelectedParticipant>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    selectedParticipant: action.payload.participant,
                },
            }
        },
        updateSessionStatusScore: (state, action: PayloadAction<UpdateSessionScore>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    score: action.payload.score,
                },
            }
        },
    },
});

export const {
    setSessionId,
    setSession,
    updateSessionStatusIsLoading,
    updateSessionStatusCurrentSpeaker,
    updateSessionSelectedParticipant,
    updateSessionStatusScore,
} = sessionSlice.actions;

export const selectSessionId = (state: RootState): number => state.session.session?.sessionId ?? 0;
export const selectSession = (state: RootState): Session|null => state.session.session;
export const selectParticipants = (state: RootState): SessionParticipant[] => state.session.participants;
export const selectSessionStatus = (state: RootState, sessionId: number): SessionStatus|null => state.session.sessionStatuses[sessionId] ?? null;
export const selectCurrentSpeaker = (state: RootState, sessionId: number): Speaker|null => state.session.sessionStatuses[sessionId]?.currentSpeaker ?? null;
export const selectSelectedParticipant = (state: RootState, sessionId: number): SessionParticipantType|null => state.session.sessionStatuses[sessionId]?.selectedParticipant ?? null;
export const selectSessionScore = (state: RootState, sessionId: number): Score|null => state.session.sessionStatuses[sessionId]?.score ?? null;

export default sessionSlice.reducer;