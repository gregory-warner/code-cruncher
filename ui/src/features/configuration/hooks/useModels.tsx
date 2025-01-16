import {useModelsQuery} from "../../../services/ollama/ollamaApi";
import {useOpenaiModelsQuery} from "../../../services/openai/openaiApi";
import {ModelType} from "../../../types";

const getModelTypeId = (modelName: string) => {
    if (modelName.includes('dall-e')) {
        return ModelType.image;
    }
    if (['tts', 'whisper'].some(name => modelName.includes(name))) {
        return ModelType.text;
    }

    return ModelType.language;
};

const useModels = () => {
    const { data: ollama } = useModelsQuery();
    const { data: models } = useOpenaiModelsQuery();

    if (!models || !ollama) return [];

    const ollamaModels = ollama.models.map(model => ({
        ...model,
        isLocal: true,
        modelIdentifier: 'ollama',
        modelTypeId: getModelTypeId(model.name),
    }));

    const openAiModels = models.data.map(model => ({
        ...model,
        name: model.id,
        isLocal: false,
        modelIdentifier: 'openai',
        modelTypeId: getModelTypeId(model.id),
    }));

    return [
        ...ollamaModels,
        ...openAiModels,
    ];
};

export default useModels;
