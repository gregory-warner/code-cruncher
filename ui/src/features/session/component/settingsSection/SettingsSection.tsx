import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import ParticipantsSection from "./components/ParticipantsSection";
import ParticipantSettingsSection from "./components/ParticipantSettingsSection";

const SettingsSection = () => {
    return (
        <Grid >
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Settings
                    </Typography>
                </Grid>
                <Grid item xs={7} textAlign='center'>
                    <Button
                        sx={{ width: '100%', textTransform: 'none', height: '100%' }}
                        onClick={() => {}}>
                        <Typography variant='body2'>Blank</Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <ParticipantsSection />
            </Grid>
            <Grid container item xs={12}>
                <ParticipantSettingsSection />
            </Grid>
        </Grid>
    );
};

export default SettingsSection;