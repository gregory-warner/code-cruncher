import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentTtsModel, selectSelectedTtsModel, setSelectedTtsModel } from "../store/actorConfigDrawerSlice";
import { getSelectedActor } from "../../actorDrawer/ActorDrawerSlice";
import { useEffect } from "react";
import { validTtsModels } from "../../../api/tts/utils/apiClient";
import {updateInitialTtsModel} from "../store/remote";

const ActorConfigTtsModelSelect: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentTtsModel = useAppSelector(selectCurrentTtsModel);
    const selectedTtsModel = useAppSelector(selectSelectedTtsModel);
    const selectedActor = useAppSelector(getSelectedActor)

    useEffect(() => {
        if (!selectedActor) {
            return;
        }

        dispatch(updateInitialTtsModel(selectedActor.actorId));
    }, [selectedActor]);

    useEffect(() => {
        dispatch(setSelectedTtsModel(currentTtsModel));
    }, [currentTtsModel])

    const onTtsModelChange = (event) => {
        dispatch(setSelectedTtsModel(event.target.value));
    };

    return (
        <FormControl fullWidth sx={{ minWidth: 120, color: 'white' }} className="actor-config-tts-model-select">
            <InputLabel
                id="age-select-label"
                sx={{ color: 'white' }}
            >
                TTS Models
            </InputLabel>
            <Select
                labelId="id-tts-model-label-text"
                id="id-tts-model-type-text"
                value={selectedTtsModel}
                fullWidth
                label="TTS Models"
                onChange={onTtsModelChange}
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
                {Array.from(validTtsModels).map((model, idx) => {
                    return <MenuItem key={idx} value={model}>{model}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default ActorConfigTtsModelSelect