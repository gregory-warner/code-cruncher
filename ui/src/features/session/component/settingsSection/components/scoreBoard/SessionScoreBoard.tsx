import React from "react";
import {Box, Grid, Paper, useTheme} from "@mui/material";
import SessionScore from "./SessionScore";

const SessionScoreBoard = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ border: `5px solid ${theme.palette.background.default}`, pl: 1, pr: 1, width: '80%' }}>
                <Grid container direction='row' justifyContent='space-around'>
                    <Grid item xs={5}>
                        <SessionScore title={'Correct'} score={1} color={theme.palette.primary.main} />
                    </Grid>
                    <Grid item xs={5}>
                        <SessionScore title={'Incorrect'} score={23} color={theme.palette.error.main} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        );
};

export default SessionScoreBoard;