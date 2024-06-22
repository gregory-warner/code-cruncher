import Conversation from '../conversation/Conversation';
import { Box, Grid } from '@mui/material';
import UserInput from '../user/UserInput';
import ActorDrawer from '../actorDrawer/ActorDrawer';
import ChatAppHeader from './components/ChatAppHeader';
import ActorConfigDrawer from '../actorConfigDrawer/ActorConfigDrawer';
import {useGetUserQuery} from "../../services/server/serverApi";
import {defaultUser, selectUser, setUser} from "../user/userSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect} from "react";

const ChatApp = () => {

    const dispatch = useAppDispatch();
    const { data: userData } = useGetUserQuery(defaultUser);
    const user = useAppSelector(selectUser);
    useEffect(() => {
        if (userData && !user) {
            dispatch(setUser(userData));
        }
    }, [userData]);

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