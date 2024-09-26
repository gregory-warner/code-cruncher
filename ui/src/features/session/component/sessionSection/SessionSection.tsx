import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useGetMessagesQuery} from "../../../../services/server/serverApi";
import {
    selectSessionId,
    updateSessionStatusIsLoading
} from "../../sessionSlice";
import SessionMessagesSection from "./components/sessionMessagesSection/SessionMessagesSection";
import {useActor} from "../../hooks/useActor";
import {Grid} from "@mui/material";
import style from "../../style";
import UserInputSection from "./components/userInput/UserInputSection";
import useCurrentSpeaker from "../../hooks/useCurrentSpeaker";
import {isActor} from "../../../../utils/util";
import {Actor} from "../../../../types";
import {skipToken} from "@reduxjs/toolkit/query";
import {setSnackbar} from "../../../../app/store/appSlice";

const SessionSection = () => {
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(selectSessionId);

    const { data: messages } = useGetMessagesQuery(sessionId || skipToken);

    const { chat } = useActor();
    const { getCurrentSpeaker, getLastParticipantIndex } = useCurrentSpeaker();

    const runSession = async (sessionId: number) => {
        const currentSpeaker = await getCurrentSpeaker(sessionId);

        if (isActor(currentSpeaker)) {
            dispatch(updateSessionStatusIsLoading({ sessionId, isLoading: true }));

            const response = await chat(sessionId, currentSpeaker as Actor);
            if (!response.messageId) {
                dispatch(setSnackbar({ message: 'Unable to send message' }));
                return;
            }

            dispatch(updateSessionStatusIsLoading({ sessionId, isLoading: false }));
        }
    };

    useEffect(() => {
        if (sessionId <= 0 || !messages) {
            return;
        }

        runSession(sessionId);
    }, [sessionId, messages]);

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

export default SessionSection;