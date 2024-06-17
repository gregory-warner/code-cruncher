import { useEffect } from 'react';
import Conversation from '../conversation/Conversation';
import { Box, Grid } from '@mui/material';
import UserInput from '../user/UserInput';
import ActorDrawer from '../actorDrawer/ActorDrawer';
import { useAppDispatch } from '../../store/hooks';
import {updateDialog} from '../conversation/store/conversationSlice';
import { defaultActor} from '../actor/actorSlice';
import ChatAppHeader from './components/ChatAppHeader';
import {defaultUser} from '../user/userSlice';
import ActorConfigDrawer from '../actorConfigDrawer/ActorConfigDrawer';
import {useGetAssistantQuery, useGetUserQuery} from "../../services/server/serverApi";

const ChatApp = () => {
    const dispatch = useAppDispatch();

    const { data: userData } = useGetUserQuery(defaultUser);
    const { data: actorData } = useGetAssistantQuery(defaultActor);

    useEffect(() => {
        if (!userData || !actorData) {
            return;
        }

        dispatch(updateDialog({
            user: userData,
            actor: actorData,
        }));

    }, [userData, actorData]);

    return (
        <Grid container direction="column" sx={{ height: "100vh", overflowY: "auto"}}>
            <Grid item>
                <ChatAppHeader />
            </Grid>
            <Grid item xs sx={{ overflowY: "scroll" }} justifyContent={"stretch"}>
                <Conversation />
            </Grid>

            <Grid item>
                <Box height={64} bgcolor="rgba(34, 34, 34, 1)" display="flex" alignItems="center" justifyContent="center">
                    <UserInput />
                </Box>
            </Grid>
            <Grid container item xs={0}>
                <ActorDrawer />
                <ActorConfigDrawer />
            </Grid>
        </Grid>
    );
};

export default ChatApp;