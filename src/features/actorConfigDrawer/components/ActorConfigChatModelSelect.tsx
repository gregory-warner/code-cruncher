import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentModel, selectSelectedModel, setSelectedModel } from "../store/actorConfigDrawerSlice";
import { getSelectedActor } from "../../actorDrawer/ActorDrawerSlice";
import { useEffect } from "react";
import { validModels } from "../../../api/chat/utils/apiClient";
import {updateInitialChatModel} from "../store/remote";

const ActorConfigChatModelSelect = () => {
    const dispatch = useAppDispatch();
    const currentModel = useAppSelector(selectCurrentModel);
    const selectedModel = useAppSelector(selectSelectedModel);
    const selectedActor = useAppSelector(getSelectedActor)

    useEffect(() => {
        if (!selectedActor) {
            return;
        }

        dispatch(updateInitialChatModel(selectedActor.actorId));
    }, [selectedActor]);

    useEffect(() => {
        dispatch(setSelectedModel(currentModel));
    }, [currentModel])


    const onChatModelChange = (event) => {
        dispatch(setSelectedModel(event.target.value));
    };

    return (
        <FormControl fullWidth sx={{ minWidth: 120, color: 'white', marginBottom: "2rem" }}>
            <InputLabel
                id="age-select-label"
                sx={{ color: 'white' }}
            >
                Chat Models
            </InputLabel>
            <Select
                labelId="id-chat-model-label-text"
                id="id-chat-model-type-text"
                value={selectedModel}
                fullWidth
                label="Chat Models"
                onChange={onChatModelChange}
                sx={{
                    color: 'white', 
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(57,255,20,0.5)!important',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                }}
            >
                {Array.from(validModels).map((model, idx) => {
                    return <MenuItem key={idx} value={model}>{model}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default ActorConfigChatModelSelect