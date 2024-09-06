import React from 'react';
import {useAppSelector} from '../../../../../store/hooks';
import {selectParticipants} from '../../../store/sessionSlice';
import {Avatar, Box, Grid, Typography, useTheme} from '@mui/material';
import {chatServerUrl} from '../../../../../../config';
import {Add} from '@mui/icons-material';

const ParticipantsSection = () => {
    const participants = useAppSelector(selectParticipants);

    if (participants.length === 0) {
        return <Box></Box>
    }

    const theme = useTheme();

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
                    <Grid item xs={3} key={`session-details-participant-${index}`}>
                        <Avatar
                            alt={`${participant.name}'s avatar`}
                            src={`${chatServerUrl}/images/${participant.avatar}`}
                            sx={{ width: '40px', height: '40px', border: `2px solid ${theme.palette.grey[300]}`, borderRadius: 1 }}
                        />
                    </Grid>
                ))}
                <Grid item xs={3}>
                    <Avatar
                        sx={{ width: '40px', height: '40px', border: `2px dashed ${theme.palette.grey[500]}`, borderRadius: 1 }}
                    >
                        <Add />
                    </Avatar>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ParticipantsSection;