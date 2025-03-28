import {Grid, IconButton} from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../../store/hooks";
import {setSession, setSessionId} from "../../../../features/session/sessionSlice";
import {setIsEditing, setSelectedActor} from "../../../../features/assistant/assistantSlice";

const AppMenu = () => {

    const dispatch = useAppDispatch();

    const resetSession = () => {
        dispatch(setSessionId(0));
        dispatch(setSession(null));
        resetSelection();
    };

    const resetSelection = () => {
        dispatch(setIsEditing(false));
        dispatch(setSelectedActor(null));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Link to={'/'}>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item xs={3}>
                <Link to={'/configuration'}>
                    <IconButton onClick={resetSession}>
                        <PersonAddAlt1Icon />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item xs={3}>
                <Link to={'/prompts'}>
                    <IconButton onClick={resetSession}>
                        <ChatBubbleIcon />
                    </IconButton>
                </Link>
            </Grid>
            <Grid item xs={3}>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default AppMenu;