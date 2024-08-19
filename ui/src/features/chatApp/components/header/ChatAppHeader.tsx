import React from 'react';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';
import {selectCurrentSpeaker} from "../../../session/store/sessionSlice";
import ChatAppMenu from "../chatAppMenu/ChatAppMenu";

const ChatAppHeader: React.FC = () => {
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const theme = useTheme();

    const speakerName = currentSpeaker?.name ?? '';

    return (
        <Box sx={{maxHeight: '8vh'}} display={"flex"} justifyContent={"center"}>
            <Grid container justifyContent={"space-between"} alignItems={"center"} bgcolor="rgba(34, 34, 34, 0.9)">
                <Grid item xs={2} sx={{flexGrow: 1}}></Grid>
                <Grid item xs={8}>
                    <Typography align='center' color={theme.palette.text.primary} variant={"h4"}>{speakerName}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <ChatAppMenu />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatAppHeader;