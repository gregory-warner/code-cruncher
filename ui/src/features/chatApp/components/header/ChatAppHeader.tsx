import React from 'react';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';
import {selectActor} from "../../../conversation/store/conversationSlice";
import ChatAppMenu from "../chatAppMenu/ChatAppMenu";

const ChatAppHeader: React.FC = () => {
    const assistant = useAppSelector(selectActor);
    const theme = useTheme();

    return (
        <Box sx={{maxHeight: '8vh'}} display={"flex"} justifyContent={"center"}>
            <Grid container justifyContent={"space-between"} alignItems={"center"} bgcolor="rgba(34, 34, 34, 0.9)">
                <Grid item xs={3} sx={{flexGrow: 1}}></Grid>
                <Grid item xs={6}>
                    <Box display="flex" alignItems="center" sx={{paddingRight: 4}}>
                        <Typography color={theme.palette.text.primary} variant={"h4"}>{assistant?.name ?? ""}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <ChatAppMenu />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatAppHeader;