import {Grid, IconButton} from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';

const ChatAppMenu = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <IconButton>
                    <HomeIcon />
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <IconButton>
                    <PersonAddAlt1Icon />
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <IconButton>
                    <ChatBubbleIcon />
                </IconButton>
            </Grid>
            <Grid item xs={3}>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default ChatAppMenu;