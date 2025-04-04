import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useGetMessagesQuery} from "../../../../services/server/serverApi";
import {
    selectSessionId,
    selectSessionStatus,
    updateSessionStatusIsLoading
} from "../../sessionSlice";
import SessionMessagesSection from "./components/sessionMessagesSection/SessionMessagesSection";
import {useActor} from "../../hooks/useActor";
import {Grid, useTheme} from "@mui/material";
import style from "../../style";
import UserInputSection from "./components/userInput/UserInputSection";
import useCurrentSpeaker from "../../hooks/useCurrentSpeaker";
import {isActor} from "../../../../utils/util";
import {skipToken} from "@reduxjs/toolkit/query";
import {setSnackbar} from "../../../../app/store/appSlice";

const SessionSection = () => {
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(selectSessionId);

    const theme = useTheme();

    const { data: messages } = useGetMessagesQuery(sessionId || skipToken);

    const { chat } = useActor();
    const { getCurrentSpeaker } = useCurrentSpeaker();

    const sessionStatus = useAppSelector(state => (sessionId ? selectSessionStatus(state, sessionId) : null));

    const runSession = async (sessionId: number) => {
        try {
            const currentSpeaker = await getCurrentSpeaker(sessionId);

            if (isActor(currentSpeaker.participant) && !sessionStatus.isLoading) {
                dispatch(updateSessionStatusIsLoading({ sessionId, isLoading: true }));
                const response = await chat(sessionId, currentSpeaker);
                dispatch(updateSessionStatusIsLoading({ sessionId, isLoading: false }));

                if (!response.messageId) {
                    dispatch(setSnackbar({ message: 'Unable to send message' }));
                    return;
                }

            }
        } catch (e) {
            dispatch(setSnackbar({ message: 'Unable to send message' }));
            dispatch(updateSessionStatusIsLoading({ sessionId, isLoading: false }));
        }
    };

    useEffect(() => {
        if (sessionId <= 0 || !messages) {
            return;
        }

        runSession(sessionId);
    }, [sessionId, messages]);

    if (!messages || !sessionId) {
        return <></>;
    }

    return (
        <>
            <Grid item sx={{...style.sessionMessageContainer, border: `1px solid ${theme.palette.divider}`}}>
                <SessionMessagesSection messages={messages}/>
            </Grid>
            <Grid container direction='column' item sx={style.userInputContainer}>
                <UserInputSection />
            </Grid>
        </>
    );
};

export default SessionSection;