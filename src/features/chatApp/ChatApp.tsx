import Conversation from '../conversation/Conversation';
import { Box, Grid } from '@mui/material';
import UserInput from './components/userInput/UserInput';
import ActorDrawer from '../actorDrawer/ActorDrawer';
import ChatAppHeader from './components/header/ChatAppHeader';
import ActorConfigDrawer from '../actorConfigDrawer/ActorConfigDrawer';
import style from './styles';

const ChatApp = () => {
    return (
        <Grid container direction="column" sx={{ overflowY: "hidden",}}>
            <Grid item xs={12} sx={style.header}>
                <ChatAppHeader />
            </Grid>

            <Grid container item xs={12} direction="row" sx={style.main}>
                <Grid item xs={2} sx={style.session}>
                </Grid>

                <Grid container direction={'column'} xs={8} sx={style.conversationContainer}>
                    <Grid item sx={style.conversation}>
                        <Conversation />
                    </Grid>
                    <Grid item xs={true}>
                        <Box
                            bgcolor="rgba(34, 34, 34, 1)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={style.userInput}>
                            <UserInput />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={2} sx={style.details}>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={style.footer}></Grid>

            <Grid container item xs={0}>
                <ActorDrawer />
                <ActorConfigDrawer />
            </Grid>
        </Grid>
    );
};

export default ChatApp;