import React from "react";
import {Box, Grid, Paper, Typography} from "@mui/material";
import SessionScore from "./SessionScore";

const SessionScoreBoard = () => {

    return (
        <Paper elevation={3} sx={{ border: '5px solid black', p: 2, width: '100%' }}>
            <Grid container direction='row' justifyContent='space-around'>
                <Grid item xs={5}>
                    <SessionScore title={'test'} score={1} />
                </Grid>
                <Grid item xs={5}>
                    <SessionScore title={'pass'} score={23} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SessionScoreBoard;