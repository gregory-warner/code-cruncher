import { TextField, MenuItem } from '@mui/material';
import useModels from '../hooks/useModels';
import {ChatApiModel} from "../../../services/openai/types";
import {Model} from "../../../services/ollama/types";

type ModelItem = ChatApiModel & Model;

const ModelSelect = ({ selectedModel, handleModelChange }) => {
    const models = useModels();

    return (
        <TextField
            select
            fullWidth
            label="Chat Model"
            value={selectedModel}
            onChange={handleModelChange}
            margin="normal"
        >
            {models.map((model: ModelItem) => (
                <MenuItem key={`${model.name ?? model.id}-${Date.now()}`} value={model.name ?? model.id}>
                    {model.name ?? model.id}
                </MenuItem>
            ))}
        </TextField>
    );

};

export default ModelSelect;