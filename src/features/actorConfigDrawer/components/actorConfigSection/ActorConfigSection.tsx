import { Button, InputLabel, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectSelectedActor } from "../../../actorDrawer/ActorDrawerSlice";
import { useEffect } from "react";

import './actorConfigSectionStyle.css';
import '../../../chatApp/chatAppStyle.css';
import {
    selectCurrentConfig,
    selectUpdatedConfig,
    setCurrentConfig,
    setIsPromptDrawerOpen, setUpdatedConfig
} from "../../store/actorConfigDrawerSlice";

const ActorConfigSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedActor = useAppSelector(selectSelectedActor);
    const currentConfig = useAppSelector(selectCurrentConfig);
    const updatedConfig = useAppSelector(selectUpdatedConfig);

    useEffect(() => {
        if (!selectedActor) {
            return;
        }

        dispatch(setCurrentConfig({
            ...currentConfig,
            prompt: selectedActor.configuration?.prompt ?? "",
            title: selectedActor.configuration?.title ?? "",
            avatar: selectedActor.configuration?.avatar ?? "",
        }))
        dispatch(setUpdatedConfig(selectedActor.configuration));
    }, [selectedActor]);

    const changePromptDrawerHandler = () => {
        dispatch(setIsPromptDrawerOpen(true));
    }

    const updateTitle = (title: string) => {
        debugger;
        dispatch(setUpdatedConfig({
            ...updatedConfig,
            title,
        }));
    };

    return (
        <div className="actor-config-section-root">
                <InputLabel sx={{ color: "white" }}>Title</InputLabel>
                <TextField
                    sx={{ "& input": { color: "white" } }}
                    className="actor-config-section-input"
                    value={updatedConfig.title}
                    fullWidth
                    onChange={(event) => updateTitle(event.target.value)}
                />

            <div className="actor-config-section-avatar" >
                <InputLabel sx={{ color: "white" }}>Avatar</InputLabel>
                <TextField
                    className="actor-config-section-text-field"
                    sx={{ "& input": { color: "white" } }}
                    value={currentConfig.avatar}
                    fullWidth
                    focused={false}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button
                    className="actor-config-button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => console.log('Change Avatar')}
                >
                    Change Avatar
                </Button>
            </div>
            <Button
                variant="contained"
                className="actor-config-button"
                color="primary"
                fullWidth
                onClick={changePromptDrawerHandler}
            >
                Change Prompt
            </Button>
      </div>
    );
};

export default ActorConfigSection