import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import ParticipantsSection from "./components/ParticipantsSection";
import ParticipantSettingsSection from "./components/ParticipantSettingsSection";
import AddParticipantSection from "./components/AddParticipantSection";
import {useAppSelector} from "../../../../store/hooks";
import {selectSession} from "../../sessionSlice";
import SessionScoreBoard from "./components/scoreBoard/SessionScoreBoard";

const SettingsSection = () => {
    const session = useAppSelector(selectSession);

    return (
        <Grid >
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={12} textAlign='center'>
                    <Typography variant='h4'>
                        {session?.sessionName ?? ''}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <SessionScoreBoard />
            </Grid>
            <Grid container item xs={12}>
                <ParticipantsSection />
            </Grid>
            <Grid container item xs={12}>
                <ParticipantSettingsSection />
            </Grid>
            <Grid container item xs={12}>
                <AddParticipantSection />
            </Grid>
        </Grid>
    );
};

export default SettingsSection;