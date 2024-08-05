import {Button, CircularProgress, Grid, List, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectActor, selectUser, setDialogId} from "../conversation/store/conversationSlice";
import {useCreateDialogMutation, useGetDialogsQuery} from "../../services/server/serverApi";
import SessionItem from "./components/SessionItem";
import React from "react";


const Sessions = () => {
    const actor = useAppSelector(selectActor);
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    if (!actor || !user) {
        return <></>;
    }

    const [createDialog] = useCreateDialogMutation();

    const {data, isLoading } = useGetDialogsQuery({actorId: actor.actorId, userId: user.userId});

    if (isLoading) {
        return (
            <CircularProgress
                aria-label="Loading sessions..."
            />
        );
    }

    const createNewDialog = async () => {
        const dialog = await createDialog({actorId: actor.actorId, userId: user.userId}).unwrap();
        dispatch(setDialogId(dialog.dialogId));
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
                    <Button sx={{ width: '100%' }} onClick={createNewDialog}>+ New Session</Button>
                </Grid>
            </Grid>
            <List>
                {data.dialogs.map((session, idx) => (
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

export default Sessions;