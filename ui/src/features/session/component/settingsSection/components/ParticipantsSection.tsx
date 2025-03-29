import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/hooks';
import {
    selectSessionId,
    updateSessionSelectedParticipant
} from '../../../sessionSlice';
import {Avatar, Box, Grid, Typography, useTheme} from "@mui/material";
import {chatServerUrl} from '../../../../../../config';
import {SessionParticipant, SessionParticipantType} from "../../../../../types";
import {
    useGetActiveSessionParticipantsQuery,
} from "../../../../../services/server/serverApi";
import {skipToken} from "@reduxjs/toolkit/query";
import useAvatarStyle from "../../../hooks/useAvatarStyle";

const ParticipantsSection = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const sessionId = useAppSelector(selectSessionId);
    const { data: sessionParticipants, isLoading } = useGetActiveSessionParticipantsQuery(sessionId || skipToken);

    const { getAvatarStyle } = useAvatarStyle();

    if (isLoading || !sessionParticipants || sessionParticipants.length === 0) {
        return <Box></Box>
    }

    const onAvatarClick = (participant: SessionParticipantType) => {
        if (!participant || participant.deletedAt) {
            return;
        }

        dispatch(updateSessionSelectedParticipant({ sessionId, participant }));
    };

    if (!sessionId) {
        return <Box />;
    }

    return (
        <Grid container direction='column' alignItems='center' justifyItems='center' padding={1}>
            <Typography align='left' variant='subtitle2' sx={{width: '100%', pl: 1}}>
                Participants
            </Typography>
            <Grid
                container
                sx={{
                    maxHeight: 'max-content',
                    width: '95%',
                    border: `2px solid ${theme.palette.grey[300]}`,
                    borderRadius: 2,
                    p: 1,
                }}
            >
                {sessionParticipants.map((sessionParticipant: SessionParticipant, index) => {
                    const participant = sessionParticipant.participant;
                    return (
                        <Grid item xs={3} key={`session-details-participant-${index}`} >
                            <Avatar
                                onClick={() => onAvatarClick(participant)}
                                alt={`${participant.name}'s avatar`}
                                src={`${chatServerUrl}/images/${participant.avatar}`}
                                sx={getAvatarStyle(participant)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default ParticipantsSection;