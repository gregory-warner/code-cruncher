import {Button, Grid, Typography} from "@mui/material";
import React from "react";

const ActorSettingsSection = () => {
    return (
        <Grid >
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Settings
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
            </Grid>
            <Grid container item xs={12}>
            </Grid>
        </Grid>
    );
};

export default ActorSettingsSection;