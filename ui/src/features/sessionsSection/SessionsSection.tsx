import {Button, CircularProgress, Grid, List, Stack, Typography} from '@mui/material';
import {useCreateSessionMutation, useGetDialogsQuery, useGetSessionsQuery} from "../../services/server/serverApi";
import SessionItem from "./components/SessionItem";
import React from "react";

const SessionsSection = () => {
    const [createSession] = useCreateSessionMutation();

    const {data, isLoading} = useGetSessionsQuery();

    if (isLoading) {
        return (
            <CircularProgress
                aria-label="Loading sessions..."
            />
        );
    }

    const createNewSession = async () => {
        // const dialog = await createDialog({actorId: actor.actorId, userId: user.userId}).unwrap();
        // dispatch(setDialogId(dialog.dialogId));
    };

    return (
        <Stack sx={{border: '1px solid black'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                    <Typography variant='h6' gutterBottom sx={{padding: '5px'}}>
                        Sessions
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button sx={{ width: '100%' }} onClick={createNewSession}>+ New Session</Button>
                </Grid>
            </Grid>
            <List>
                {data.map((session, idx) => (
                    <Grid key={`key-session-item-${idx}`} container justifyContent="center" alignItems="center">
                        <SessionItem
                            key={`key-session-item-${idx}`}
                            sessionId={idx}
                            session={session}
                        />
                    </Grid>
                ))}
            </List>
        </Stack>
    );
};

export default SessionsSection;