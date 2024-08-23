import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useLazyGetSessionParticipantsQuery} from "../../services/server/serverApi";
import {
    selectCurrentSequenceId,
    selectParticipants,
    selectSessionId,
    setCurrentSpeaker,
    setParticipants
} from "./store/sessionSlice";
import SessionMessageSection from "./component/sessionMessages/SessionMessageSection";

const Session = () => {
    const dispatch = useAppDispatch();
    const participants = useAppSelector(selectParticipants);
    const sessionId = useAppSelector(selectSessionId);
    const currentSequenceId = useAppSelector(selectCurrentSequenceId);

    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    useEffect(() => {
        if (sessionId <= 0) {
            return;
        }

        getSessionParticipants(sessionId).then(({ data: sessionParticipants }) => {
            dispatch(setParticipants(sessionParticipants));
            if (sessionParticipants?.length > 0) {
                dispatch(setCurrentSpeaker(sessionParticipants[currentSequenceId]));
            }
        });

    }, [sessionId]);

    useEffect(() => {
        if (!Array.isArray(participants)) {
            return;
        }

        dispatch(setCurrentSpeaker(participants[currentSequenceId]));
    }, [currentSequenceId]);

    return (
        <SessionMessageSection />
    );
};

export default Session;