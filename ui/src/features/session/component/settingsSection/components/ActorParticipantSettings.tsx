import React from "react";
import {Grid, Typography} from "@mui/material";
import {Actor} from "../../../../../types";

const ActorParticipantSettings = ({ actor }: {actor: Actor}) => {

    return (
        <Grid container sx={{ width: '100%', pt: 2 }}>
            <Grid item alignContent='center' xs={12}>
                <Typography align='center'>{actor.name}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle2' color='grey'>Model:</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography>{actor.aiModel.modelName}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle2' color='grey'>Type:</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography>{actor.aiModel.isLocal ? 'offline' : 'online'}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle2' color='grey'>Prompt:</Typography>
            </Grid>
            <Grid item xs={9} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Typography>{actor.prompt.prompt}</Typography>
            </Grid>
        </Grid>
    );
};

export default ActorParticipantSettings;