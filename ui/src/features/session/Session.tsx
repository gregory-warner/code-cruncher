import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useGetMessagesQuery, useLazyGetSessionParticipantsQuery} from "../../services/server/serverApi";
import {
    selectCurrentSequenceId,
    selectParticipants,
    selectSessionId, selectSessionStatus,
    setCurrentSpeaker,
    setParticipants, setSelectedParticipant, updateSessionStatus
} from "./sessionSlice";
import SessionMessagesSection from "./component/sessionMessagesSection/SessionMessagesSection";
import {useActor} from "./hooks/useActor";
import {Grid} from "@mui/material";
import style from "../codeCruncher/styles";
import UserInputSection from "./component/userInput/UserInputSection";
import useCurrentSpeaker from "./hooks/useCurrentSpeaker";
import {isActor} from "../../utils/util";
import {Actor} from "../../types";
import {PartialSessionStatus, SessionStatus} from "./types";
import {skipToken} from "@reduxjs/toolkit/query";

const Session = () => {
    const dispatch = useAppDispatch();
    const participants = useAppSelector(selectParticipants);
    const sessionId = useAppSelector(selectSessionId);
    const currentSequenceId = useAppSelector(selectCurrentSequenceId);

    const sessionStatus: SessionStatus = useAppSelector(state =>
        sessionId ? selectSessionStatus(state, sessionId) : null
    );

    const { data: messages } = useGetMessagesQuery(sessionId || skipToken);


    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    const { chat } = useActor();
    const { getCurrentSpeaker, getLastParticipantIndex } = useCurrentSpeaker();

    const runSession = async (sessionId: number) => {
        const sessionStatus: PartialSessionStatus = {
            isLoading: true,
        }
        dispatch(updateSessionStatus({ sessionId, sessionStatus }));

        const currentSpeaker = await getCurrentSpeaker(sessionId);

        if (isActor(currentSpeaker)) {
            const response = await chat(sessionId, currentSpeaker as Actor);
            // if (response?.messageId) {
            //     await runSession(sessionId);
            // }
        }
    };

    const setSessionStatus = async (sessionId: number) => {
        const participants = await getSessionParticipants(sessionId).unwrap();
        const lastIndex = await getLastParticipantIndex(sessionId, participants);
        const nextIndex = (lastIndex + 1) % participants.length;
        const sessionStatus: PartialSessionStatus = {
            currentSequenceId: nextIndex,
            participants,
        }
        dispatch(updateSessionStatus({ sessionId, sessionStatus }));
    };

    useEffect(() => {
        if (sessionId <= 0) {
            return;
        }

        setSessionStatus(sessionId);

        // runSession(sessionId);

        // getSessionParticipants(sessionId).then(({ data: sessionParticipants }) => {
        //     dispatch(setParticipants(sessionParticipants));
        //     if (sessionParticipants?.length > 0) {
        //         dispatch(setCurrentSpeaker(sessionParticipants[currentSequenceId]));
        //         dispatch(setSelectedParticipant(sessionParticipants[currentSequenceId]));
        //     }
        // });

    }, [sessionId]);

    useEffect(() => {
        if (!messages || messages.length === 0) {
            return;
        }

        runSession(sessionId);
    }, [messages]);

    // useEffect(() => {
    //     if (!Array.isArray(participants)) {
    //         return;
    //     }
    //
    //     dispatch(setCurrentSpeaker(participants[currentSequenceId]));
    // }, [currentSequenceId]);

    if (!messages) {
        return <></>;
    }

    return (
        <>
            <Grid item sx={style.sessionMessageContainer}>
                <SessionMessagesSection messages={messages}/>
            </Grid>
            <Grid container direction='column' item sx={style.userInputContainer}>
                <UserInputSection />
            </Grid>
        </>
    );
};

export default Session;