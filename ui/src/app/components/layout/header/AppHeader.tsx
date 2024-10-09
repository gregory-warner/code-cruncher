import React from 'react';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import AppMenu from "../appMenu/AppMenu";
import {selectCurrentSpeaker, selectSessionId} from "../../../../features/session/sessionSlice";
import {useAppSelector} from "../../../../store/hooks";

const AppHeader: React.FC = () => {
    const sessionId = useAppSelector(selectSessionId);

    const currentSpeaker = useAppSelector(state => (
        sessionId ? selectCurrentSpeaker(state, sessionId) : null)
    );

    const theme = useTheme();

    const speakerName = currentSpeaker?.name ?? '';

    return (
        <Box sx={{maxHeight: '10%'}} display={"flex"} justifyContent={"center"}>
            <Grid container justifyContent={"space-between"} alignItems={"center"} bgcolor="rgba(34, 34, 34, 0.9)">
                <Grid item xs={2} sx={{flexGrow: 1}}></Grid>
                <Grid item xs={8}>
                    <Typography align='center' color={theme.palette.text.primary} variant={"h4"}>{speakerName}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <AppMenu />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppHeader;