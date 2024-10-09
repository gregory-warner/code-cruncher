import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const ActorSettingsSection = () => {
    return (
        <Grid >
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Actions
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Button fullWidth variant="outlined" color="secondary" startIcon={<AddIcon />}>New</Button>
            </Grid>
            <Grid container item xs={12}>
            </Grid>
        </Grid>
    );
};

export default ActorSettingsSection;