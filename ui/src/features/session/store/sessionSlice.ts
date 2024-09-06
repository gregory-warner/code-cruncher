import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../store/store';
import {SessionParticipantType} from "../../../types";

export interface SessionState {
    sessionId: number|null;
    participants: SessionParticipantType[];
    currentSpeaker: SessionParticipantType | null;
    currentSequenceId: number;
    selectedParticipant: SessionParticipantType|null;
}

const initialState: SessionState = {
    sessionId: null,
    participants: [],
    currentSpeaker: null,
    currentSequenceId: 0,
    selectedParticipant: null,
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
        }
    },
});

export const {
    setSessionId,
    setParticipants,
    addSessionParticipant,
    incrementCurrentSequenceId,
    setCurrentSpeaker,
    setSelectedParticipant,
} = sessionSlice.actions;

export const selectSessionId = (state: RootState): number => state.session.sessionId;
export const selectParticipants = (state: RootState): SessionParticipantType[] => state.session.participants;
export const selectCurrentSpeaker = (state: RootState): SessionParticipantType | null => state.session.currentSpeaker;
export const selectCurrentSequenceId = (state: RootState): number => state.session.currentSequenceId;
export const selectSelectedParticipant = (state: RootState): SessionParticipantType => state.session.selectedParticipant;

export default sessionSlice.reducer;