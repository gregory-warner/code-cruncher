import React from "react";
import {Grid, Typography} from "@mui/material";
import {User} from "../../../../../types";

const UserParticipantSettings = ({ user }: {user: User}) => {

    return (
        <Grid container sx={{ width: '100%', pt: 2 }}>
            <Grid item alignContent='center' xs={12}>
                <Typography align='center'>{user.name}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='subtitle2' color='grey'>Username:</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography>{user.username}</Typography>
            </Grid>
        </Grid>
    );
};

export default UserParticipantSettings;