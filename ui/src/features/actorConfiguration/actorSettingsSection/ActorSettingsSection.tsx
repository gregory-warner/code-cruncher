import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {Actor} from "../../../types";
import {useAppSelector} from "../../../store/hooks";
import {selectSelectedActor} from "../store/actorConfigurationSlice";
import ActorColorThemeSection from "./components/ActorColorThemeSection";

const ActorSettingsSection = () => {
    const actor: Actor|null = useAppSelector(selectSelectedActor)

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
                {actor?.colorTheme && <ActorColorThemeSection colorTheme={actor.colorTheme} />}
            </Grid>
            <Grid container item xs={12}>
            </Grid>
        </Grid>
    );
};

export default ActorSettingsSection;