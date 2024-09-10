import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useLazyGetSessionParticipantsQuery} from "../../services/server/serverApi";
import {
    selectCurrentSequenceId,
    selectParticipants,
    selectSessionId,
    setCurrentSpeaker,
    setParticipants, setSelectedParticipant
} from "./store/sessionSlice";
import SessionMessagesSection from "./component/sessionMessagesSection/SessionMessagesSection";
import {useActor} from "./hooks/useActor";
import {Grid} from "@mui/material";
import style from "../codeCruncher/styles";
import UserInputSection from "./component/userInput/UserInputSection";

const Session = () => {
    const dispatch = useAppDispatch();
    const participants = useAppSelector(selectParticipants);
    const sessionId = useAppSelector(selectSessionId);
    const currentSequenceId = useAppSelector(selectCurrentSequenceId);

    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    useActor();

    useEffect(() => {
        if (sessionId <= 0) {
            return;
        }

        getSessionParticipants(sessionId).then(({ data: sessionParticipants }) => {
            dispatch(setParticipants(sessionParticipants));
            if (sessionParticipants?.length > 0) {
                dispatch(setCurrentSpeaker(sessionParticipants[currentSequenceId]));
                dispatch(setSelectedParticipant(sessionParticipants[currentSequenceId]));
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
        <>
            <Grid item sx={style.sessionMessageContainer}>
                <SessionMessagesSection />
            </Grid>
            <Grid container direction='column' item sx={style.userInputContainer}>
                <UserInputSection />
            </Grid>
        </>
    );
};

export default Session;