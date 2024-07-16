import Conversation from '../conversation/Conversation';
import { Box, Grid } from '@mui/material';
import UserInput from './components/userInput/UserInput';
import ActorDrawer from '../actorDrawer/ActorDrawer';
import ChatAppHeader from './components/ChatAppHeader';
import ActorConfigDrawer from '../actorConfigDrawer/ActorConfigDrawer';

const ChatApp = () => {

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