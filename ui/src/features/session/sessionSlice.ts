import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {Session, SessionParticipantType} from "../../types";
import {
    SessionStatus,
    Speaker,
    UpdateSessionCurrentSpeaker,
    UpdateSessionIsLoading,
    UpdateSessionStatus, UpdateSessionTypeId
} from "./types";

export interface SessionState {
    sessionId: number|null;
    participants: SessionParticipantType[];
    currentSpeaker: SessionParticipantType | null;
    currentSequenceId: number;
    selectedParticipant: SessionParticipantType|null;
    sessionStatuses: {
        [key: number]: SessionStatus;
    }
}

const initialState: SessionState = {
    sessionId: null,
    participants: [],
    currentSpeaker: null,
    currentSequenceId: 0,
    selectedParticipant: null,
    sessionStatuses: {},
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionId: (state, action: PayloadAction<number>) => {
            state.sessionId = action.payload;
        },
        setParticipants: (state, action: PayloadAction<SessionParticipantType[]>) => {
            state.participants = action.payload;
        },
        addSessionParticipant: (state, action: PayloadAction<SessionParticipantType>) => {
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
        setCurrentSpeaker: (state, action: PayloadAction<SessionParticipantType>) => {
            state.currentSpeaker = action.payload;
        },
        setSelectedParticipant: (state, action: PayloadAction<SessionParticipantType>) => {
            state.selectedParticipant = action.payload;
        },
        updateSessionStatus: (state, action: PayloadAction<UpdateSessionStatus>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    ...action.payload.sessionStatus,
                },
            }
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
        updateSessionStatusTypeId: (state, action: PayloadAction<UpdateSessionTypeId>) => {
            state.sessionStatuses = {
                ...state.sessionStatuses,
                [action.payload.sessionId]: {
                    ...state.sessionStatuses[action.payload.sessionId],
                    sessionTypeId: action.payload.sessionTypeId,
                },
            }
        },
        updateSessionStatusesTypeIds: (state, action: PayloadAction<Session[]>) => {
            let statuses = {...state.sessionStatuses};
            action.payload.forEach(session => {
                statuses[session.sessionId] = {
                    ...statuses[session.sessionId],
                    sessionTypeId: session.sessionTypeId,
                }
            });

            state.sessionStatuses = statuses;
        },
    },
});

export const {
    setSessionId,
    setSelectedParticipant,
    updateSessionStatus,
    updateSessionStatusIsLoading,
    updateSessionStatusCurrentSpeaker,
    updateSessionStatusTypeId,
    updateSessionStatusesTypeIds
} = sessionSlice.actions;

export const selectSessionId = (state: RootState): number => state.session.sessionId;
export const selectParticipants = (state: RootState): SessionParticipantType[] => state.session.participants;
export const selectCurrentSequenceId = (state: RootState): number => state.session.currentSequenceId;
export const selectSelectedParticipant = (state: RootState): SessionParticipantType => state.session.selectedParticipant;
export const selectSessionStatus = (state: RootState, sessionId: number): SessionStatus|null => state.session.sessionStatuses[sessionId] ?? null;
export const selectCurrentSpeaker = (state: RootState, sessionId: number): Speaker|null => state.session.sessionStatuses[sessionId]?.currentSpeaker ?? null;
export const selectSessionTypeId = (state: RootState, sessionId: number): number|null => state.session.sessionStatuses[sessionId]?.sessionTypeId ?? null;

export default sessionSlice.reducer;