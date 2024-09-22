import {Button, CircularProgress, Grid, List, Stack, Typography} from '@mui/material';
import {
    useAddParticipantMutation,
    useCreateSessionMutation,
    useGetSessionsQuery
} from '../../../../services/server/serverApi';
import SessionItem from './components/SessionItem';
import React, {useEffect} from 'react';
import {SessionRequest} from '../../../../services/server/types';
import {Session, SessionType, User} from '../../../../types';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {selectUser} from '../../../user/userSlice';
import {setSessionId, updateSessionStatusesTypeIds} from '../../sessionSlice';
import {isUser} from '../../../../utils/util';

const SessionsSection = () => {
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);

    const [createSession] = useCreateSessionMutation();
    const {data, isLoading} = useGetSessionsQuery();

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(updateSessionStatusesTypeIds(data));
        }
    }, [data, isLoading]);

    if (isLoading || !isUser(user)) {
        return (
            <CircularProgress
                aria-label='Loading sessions...'
            />
        );
    }

    const createNewSession = async () => {
        const request: SessionRequest = {
            sessionName: 'Untitled',
            sessionTypeId: SessionType.General,
            createdBy: user.userId,
        }
        const session: Session = await createSession(request).unwrap();
        dispatch(setSessionId(session.sessionId));
    };

    return (
        <Stack sx={{ height: '100%' }}>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Sessions
                    </Typography>
                </Grid>
                <Grid item xs={7} textAlign='center'>
                    <Button
                        sx={{ width: '100%', textTransform: 'none', height: '100%' }}
                        onClick={createNewSession}>
                        <Typography variant='body2'>+ New Session</Typography>
                    </Button>
                </Grid>
            </Grid>
            <List sx={{ overflowY: 'auto', height: 'calc(100% - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {data.map((session, idx) => (
                    <SessionItem
                        key={`key-session-item-${idx}`}
                        sessionId={idx}
                        session={session}
                    />
                ))}
            </List>
        </Stack>
    );

};

export default SessionsSection;