import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/hooks';
import {
    selectCurrentSpeaker,
    selectSelectedParticipant, selectSessionId,
    setSelectedParticipant
} from '../../../sessionSlice';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import {chatServerUrl} from '../../../../../../config';
import {Add} from '@mui/icons-material';
import {SessionParticipantType} from "../../../../../types";
import {useGetSessionParticipantsQuery} from "../../../../../services/server/serverApi";
import {skipToken} from "@reduxjs/toolkit/query";

const ParticipantsSection = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const sessionId = useAppSelector(selectSessionId);
    const { data: participants, isLoading } = useGetSessionParticipantsQuery(sessionId || skipToken);

    const selectedParticipant = useAppSelector(selectSelectedParticipant);
    const currentSpeaker = useAppSelector(state => (
        sessionId ? selectCurrentSpeaker(state, sessionId) : null)
    );

    if (isLoading || !participants || participants.length === 0) {
        return <Box></Box>
    }

    const style = {
        selectedAvatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 1
        },
        currentAvatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: 1
        },
        avatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 1
        },
        newAvatar: {
            width: '40px',
            height: '40px',
            border: `2px dashed ${theme.palette.grey[500]}`,
            borderRadius: 1
        }
    };

    const getAvatarStyle = (participant: SessionParticipantType|null) => {
        if (!participant) {
            if (!selectedParticipant) {
                return style.selectedAvatar;
            }
            return style.newAvatar;
        }

        if (participant === selectedParticipant) {
            return style.selectedAvatar;
        }

        if (participant === currentSpeaker) {
            return style.currentAvatar;
        }

        return style.avatar;
    };

    const onAvatarClick = (participant: SessionParticipantType) => {
        dispatch(setSelectedParticipant(participant));
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
                {participants.map((participant, index) => (
                    <Grid item xs={3} key={`session-details-participant-${index}`} >
                        <Avatar
                            onClick={() => onAvatarClick(participant)}
                            alt={`${participant.name}'s avatar`}
                            src={`${chatServerUrl}/images/${participant.avatar}`}
                            sx={getAvatarStyle(participant)}
                        />
                    </Grid>
                ))}
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