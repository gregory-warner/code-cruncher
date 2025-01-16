import { TextField, MenuItem } from '@mui/material';
import useModels from '../hooks/useModels';
import {ChatApiModel} from "../../../services/openai/types";
import {Model} from "../../../services/ollama/types";


type ModelItem = Partial<ChatApiModel> & Partial<Model>;

const ModelSelect = ({ selectedModel, handleModelChange }) => {
    const models = useModels();

    const model = models.find(m => m.name === selectedModel);

    return (
        <TextField
            select
            fullWidth
            label="Chat Model"
            value={model?.name ?? ''}
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