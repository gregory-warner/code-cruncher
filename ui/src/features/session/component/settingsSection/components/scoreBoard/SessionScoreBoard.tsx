import React from "react";
import {Box, Grid, Typography} from "@mui/material";
import SessionScore from "./SessionScore";

const SessionScoreBoard = () => {

    return (
        <Grid container direction='row' alignItems='center' alignContent='center' sx={{border: '1px solid red'}}>
            <Grid item xs={5}>
                <SessionScore title={'test'} score={1} />
            </Grid>
            <Grid item xs={5}>
                <SessionScore title={'pass'} score={23} />
            </Grid>
        </Grid>
    );
};

export default SessionScoreBoard;