import {Button, CircularProgress, Grid, List, Stack, Typography} from '@mui/material';
import {
    useAddParticipantMutation,
    useCreateSessionMutation,
    useGetSessionsQuery
} from "../../services/server/serverApi";
import SessionItem from "./components/SessionItem";
import React from "react";
import {SessionRequest} from "../../services/server/types";
import {Session, SessionParticipantType, SessionType, User} from "../../types";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectUser} from "../user/userSlice";
import {addSessionParticipant, setSessionId} from "../session/store/sessionSlice";
import {isUser} from "../../utils/util";

const SessionsSection = () => {
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);

    const [createSession] = useCreateSessionMutation();
    const [addParticipant] = useAddParticipantMutation();
    const {data, isLoading} = useGetSessionsQuery();

    if (isLoading || !isUser(user)) {
        return (
            <CircularProgress
                aria-label="Loading sessions..."
            />
        );
    }

    const createNewSession = async () => {
        const request: SessionRequest = {
            sessionName: 'Untitled',
            sessionTypeId: SessionType.code,
            createdBy: user.userId,
        }
        const session: Session = await createSession(request).unwrap();
        dispatch(setSessionId(session.sessionId));
    };

    return (
        <Stack sx={{border: '1px solid black'}}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                    <Typography variant='h6' gutterBottom sx={{padding: '5px'}}>
                        Sessions
                    </Typography>
                </Grid>
                <Grid item xs={7}>
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