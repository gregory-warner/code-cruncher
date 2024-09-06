import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../store/hooks';
import {selectParticipants, selectSelectedParticipant, setSelectedParticipant} from '../../../store/sessionSlice';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import {chatServerUrl} from '../../../../../../config';
import {Add} from '@mui/icons-material';
import {SessionParticipantType} from "../../../../../types";

const ParticipantsSection = () => {
    const dispatch = useAppDispatch();
    const participants = useAppSelector(selectParticipants);
    const selectedParticipant = useAppSelector(selectSelectedParticipant);

    if (participants.length === 0) {
        return <Box></Box>
    }

    const theme = useTheme();

    const style = {
        selectedAvatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.primary.main}`,
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
                    <Grid item xs={3} key={`session-details-participant-${index}`} onClick={() => onAvatarClick(participant)}>
                        <Avatar
                            alt={`${participant.name}'s avatar`}
                            src={`${chatServerUrl}/images/${participant.avatar}`}
                            sx={(participant === selectedParticipant ? style.selectedAvatar : style.avatar)}
                        />
                    </Grid>
                ))}
                <Grid item xs={3} onClick={() => onAvatarClick(null)}>
                    <Avatar sx={(selectedParticipant === null ? style.selectedAvatar : style.newAvatar)} >
                        <Add />
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ParticipantsSection;