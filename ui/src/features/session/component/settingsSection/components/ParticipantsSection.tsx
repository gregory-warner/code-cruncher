import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/hooks';
import {
    selectSessionId,
    updateSessionSelectedParticipant
} from '../../../sessionSlice';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import {chatServerUrl} from '../../../../../../config';
import {Add} from '@mui/icons-material';
import {SessionParticipantType} from "../../../../../types";
import {useGetSessionParticipantsQuery} from "../../../../../services/server/serverApi";
import {skipToken} from "@reduxjs/toolkit/query";
import useAvatarStyle from "../../../hooks/useAvatarStyle";

const ParticipantsSection = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const sessionId = useAppSelector(selectSessionId);
    const { data: sessionParticipants, isLoading } = useGetSessionParticipantsQuery(sessionId || skipToken);

    const { getAvatarStyle } = useAvatarStyle(theme);

    if (isLoading || !sessionParticipants || sessionParticipants.length === 0) {
        return <Box></Box>
    }

    const onAvatarClick = (participant: SessionParticipantType) => {
        dispatch(updateSessionSelectedParticipant({ sessionId, participant }));
    };

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
                {sessionParticipants.map((sessionParticipant, index) => {
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
                <Grid item xs={3} onClick={() => onAvatarClick(null)}>
                    <Avatar sx={getAvatarStyle(null)} >
                        <Add />
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ParticipantsSection;