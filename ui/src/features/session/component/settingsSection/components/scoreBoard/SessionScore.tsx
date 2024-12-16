import React from "react";
import {Grid, Typography} from "@mui/material";

const SessionScore = ({title, score}: {title: string, score: number}) => {

    return (
        <Grid container direction='column' alignItems='center'>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle2' color='grey'>{score}</Typography>
        </Grid>
    );
};

export default SessionScore;