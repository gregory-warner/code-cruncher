import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    useAddParticipantMutation,
    useDeleteParticipantFromSessionMutation,
    useGetActiveSessionParticipantsQuery,
    useLazyGetSessionParticipantsQuery
} from "../../../services/server/serverApi";
import {ParticipantTypeId, SessionParticipant, SessionParticipantType} from "../../../types";
import {setSnackbar} from "../../../app/store/appSlice";
import {selectSelectedParticipant, selectSession} from "../sessionSlice";
import {isUser} from "../../../utils/util";
import {useEffect, useState} from "react";
import {skipToken} from "@reduxjs/toolkit/query";

export const useSessionParticipant = () => {
    const dispatch = useAppDispatch();
    const session = useAppSelector(selectSession);
    const sessionId = session?.sessionId ?? 0;

    const selectedParticipant = useAppSelector(state => (
        sessionId ? selectSelectedParticipant(state, sessionId) : null)
    );

    const { data, isLoading: areParticipantsLoading } = useGetActiveSessionParticipantsQuery(sessionId ? sessionId : skipToken);
    const participants = data ?? [];

    const [participantMap, setParticipantMap] = useState<Map<number, SessionParticipant>>(new Map());

    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    const [addParticipant] = useAddParticipantMutation();
    const [deleteParticipant] = useDeleteParticipantFromSessionMutation();

    useEffect(() => {
        if (!Array.isArray(participants)) {
            return;
        }

        const map = new Map();
        for (const participant of participants) {
            map.set(participant.sessionParticipantId, participant);
        }

        setParticipantMap(map);
    }, [participants]);

    const addParticipantToSession = async (assistantId?: number, sessionId?: number) => {
        if (!assistantId || !sessionId) {
            return;
        }

        const newParticipant = await addParticipant({
            sessionId,
            participantId: assistantId,
            participantTypeId: ParticipantTypeId.actor,
        }).unwrap();

        if (!newParticipant.participantId) {
            dispatch(setSnackbar({ message: `Unable to add new participant` }));
        }
    };

    const deleteSessionParticipant = async (sessionParticipantId: number) => {
        if (!sessionId || !participantMap.has(sessionParticipantId)) {
            return;
        }

        const sessionParticipant = participantMap.get(sessionParticipantId);
        if (isUser(sessionParticipant.participant)) {
            return;
        }

        await deleteParticipant({ sessionId, sessionParticipantId }).unwrap();
    };

    const getSessionParticipant = async (participant: SessionParticipantType) => {
        const sessionParticipants = await getSessionParticipants(sessionId).unwrap();

        return sessionParticipants.find(sp => (
            ('actorId' in sp.participant && 'actorId' in participant && sp.participant.actorId === participant.actorId) ||
            ('userId' in sp.participant && 'userId' in participant && sp.participant.userId === participant.userId)
        ));
    };

    return {
        getSessionParticipant,
        addParticipantToSession,
        deleteSessionParticipant,
        participants,
        selectedParticipant,
    };
};