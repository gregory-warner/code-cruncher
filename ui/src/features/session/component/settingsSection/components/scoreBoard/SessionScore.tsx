import React from "react";
import {Grid, Typography} from "@mui/material";

const SessionScore = ({title, score}: {title: string, score: number}) => {

    return (
        <Grid container direction='row'>
            <Grid item xs={12}>
                <Typography variant='h6'>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='subtitle2' color='grey'>{score}</Typography>
            </Grid>
        </Grid>
    );
};

export default SessionScore;