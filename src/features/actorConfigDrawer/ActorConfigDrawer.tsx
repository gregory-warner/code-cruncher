import * as React from "react";
import {Box, Button, CssBaseline, Divider, Drawer, Grid, Typography} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    isOpen,
    selectCurrentModel,
    selectCurrentTtsModel,
    selectSelectedModel,
    selectSelectedTtsModel, selectUpdatedConfig,
    setActorConfigDrawerOpen,
    setSelectedModel
} from "./store/actorConfigDrawerSlice";
import './actorConfigDrawerStyle.css';
import { selectSelectedActor, setDrawerOpen } from "../actorDrawer/ActorDrawerSlice";
import ActorConfigChatModelSelect from "./components/ActorConfigChatModelSelect";
import ActorConfigTtsModelSelect from "./components/ActorConfigTtsModelSelect";
import ActorConfigSection from "./components/actorConfigSection/ActorConfigSection";
import ActorConfigPromptDrawer from "./ActorConfigPromptDrawer";
import {
    updateActorTitle,
    updateAssistantChatModel,
    updateAssistantTtsModel,
    updateInitialChatModel
} from "./store/remote";

const drawerPaperProps = {
    backgroundColor: "rgba(34, 34, 34, 1)"
};

const ActorConfigDrawer: React.FC = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(isOpen);
    const currentModel = useAppSelector(selectCurrentModel);
    const selectedModel = useAppSelector(selectSelectedModel);
    const selectedActor = useAppSelector(selectSelectedActor)
    const currentTtsModel = useAppSelector(selectCurrentTtsModel);
    const selectedTtsModel = useAppSelector(selectSelectedTtsModel);
    const updatedConfig = useAppSelector(selectUpdatedConfig);

    const onClose = () => {
        dispatch(setActorConfigDrawerOpen(false));
        dispatch(setDrawerOpen(true));
        dispatch(updateInitialChatModel(selectedActor.actorId));
        dispatch(setSelectedModel(currentModel));
    }

    const onFinish = () => {
        if (selectedModel && selectedModel !== currentModel) {
            dispatch(updateAssistantChatModel({actorId: selectedActor.actorId, model: selectedModel}));
        }
        if (selectedTtsModel && selectedTtsModel !== currentTtsModel) {
            dispatch(updateAssistantTtsModel({ actorId: selectedActor.actorId, model: selectedTtsModel }));
        }
        dispatch(setActorConfigDrawerOpen(false));
        dispatch(setDrawerOpen(true));

        if (selectedActor.configuration.title !== updatedConfig.title) {
            dispatch(updateActorTitle({actorId: selectedActor.actorId, title: updatedConfig.title}));
        }
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
                <Button className="Actor-Drawer-Footer-Cancel-Button Dark-Mode-Button-Background" variant={"contained"} onClick={onClose}>Back</Button>
            </Grid>
            <Grid item xs={2}>
                <Button className="Actor-Drawer-Footer-Finish-Button"  variant={"contained"} onClick={onFinish}>Finish</Button>
            </Grid>
        </Grid>
    );

    return (
        <Drawer
            anchor={"left"} 
            open={open}
            onClose={onClose}
            PaperProps={{ style: drawerPaperProps, className: 'drawer-paper'  }}
        >
            <Box p={2}>
                <Typography align={'center'} variant={'h4'}>{selectedActor?.name ?? ''}</Typography>
                <CssBaseline />
                <ActorConfigChatModelSelect />
                <Divider />
                <ActorConfigTtsModelSelect />
                <Divider />
                <ActorConfigSection />
            </Box>
            <ActorConfigPromptDrawer />
            {footer}
        </Drawer>
    );
};

export default ActorConfigDrawer