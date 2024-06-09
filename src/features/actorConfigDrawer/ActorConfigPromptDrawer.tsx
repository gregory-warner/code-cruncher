import { Button, Drawer, FormControl, Grid, InputLabel, TextField } from "@mui/material";

import './actorConfigDrawerStyle.css';

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectUpdatedConfig,
    selectIsPromptDrawerOpen,
    setIsPromptDrawerOpen,
    selectCurrentConfig, setCurrentConfig, setUpdatedConfig
} from "./store/actorConfigDrawerSlice";
import { fetchActors, getSelectedActor } from "../actorDrawer/ActorDrawerSlice";
import React, { useEffect } from "react";
import { selectActors, updateActors } from "../actor/actorSlice";
import {updateActorPrompt} from "./store/remote";

const drawerPaperProps = {
    backgroundColor: "rgba(34, 34, 34, 1)",
};

const ActorConfigPromptDrawer: React.FC = () => {
    const isDrawerOpen = useAppSelector(selectIsPromptDrawerOpen);
    const selectedActor = useAppSelector(getSelectedActor);
    const currentConfig = useAppSelector(selectCurrentConfig);
    const updatedConfig = useAppSelector(selectUpdatedConfig);
    const dispatch = useAppDispatch();

    const onBack = () => {
        dispatch(setIsPromptDrawerOpen(false));
        dispatch(setCurrentConfig(selectedActor.configuration));
    }

    const onFinish = () => {
        dispatch(updateActorPrompt({actorId: selectedActor.actorId, prompt: updatedConfig.prompt ?? ""}));
        dispatch(updateActors());
        dispatch(setIsPromptDrawerOpen(false));
    }

    useEffect(() => {
        if (!selectedActor) {
            return;
        }

        dispatch(setCurrentConfig(selectedActor.configuration));
        dispatch(setUpdatedConfig(selectedActor.configuration));
    }, [selectedActor]);

    const onPromptChange = (event) => {
        dispatch(setUpdatedConfig({
            ...currentConfig,
            prompt: event.target.value,
        }));
    }

    const footer = (
        <Grid
            container 
            justifyContent={"space-between"} 
            className="Actor-Drawer-Footer"
            padding={1} 
            item 
            xs={12} 
        >
            <Grid item xs={2}>
                <Button className="Actor-Drawer-Footer-Cancel-Button Dark-Mode-Button-Background" variant={"contained"} onClick={onBack}>Back</Button>
            </Grid>
            <Grid item xs={2}>
                <Button className="Actor-Drawer-Footer-Finish-Button"  variant={"contained"} onClick={onFinish}>Finish</Button>
            </Grid>
        </Grid>
    );

    return (
        <Drawer
            anchor={"left"} 
            open={isDrawerOpen}
            onClose={()=>{}}
            PaperProps={{ style: drawerPaperProps, className: 'drawer-paper' }}
        >
            <FormControl sx={{padding: "1.5rem", width: "auto"}}>
                <InputLabel shrink sx={{ color: "white", padding: "1rem" }}>Prompt</InputLabel>
                <TextField
                    className={"actor-config-section-input"}
                    fullWidth
                    multiline
                    value={updatedConfig.prompt}
                    rows={30}
                    variant="outlined"
                    onChange={onPromptChange}
                    inputProps={{ style: { color: "white" }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            {footer}
        </Drawer>
    );
}

export default ActorConfigPromptDrawer;