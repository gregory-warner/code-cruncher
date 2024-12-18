import React from "react";
import {Grid, Typography} from "@mui/material";

const SessionScore = ({title, score, color='grey'}: { title: string, score: number, color: string }) => {

    return (
        <Grid container direction='column' alignItems='center'>
            <Typography variant='h6'>{title}</Typography>
            <Typography  variant='subtitle2' color={`${color}`} sx={{ fontFamily: 'Digital-7', fontSize: '2rem' }}>{score}</Typography>
        </Grid>
    );
};

export default SessionScore;