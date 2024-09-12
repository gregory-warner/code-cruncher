import {useModelsQuery} from "../../../services/ollama/ollamaApi";
import {useOpenaiModelsQuery} from "../../../services/openai/openaiApi";

const useModels = () => {
    const { data: ollama } = useModelsQuery();
    const { data: models } = useOpenaiModelsQuery();

    if (!models || !ollama) return [];

    const ollamaModels = ollama.models.map(model => ({
        ...model,
        isLocal: true,
    }));

    const openAiModels = models.data.map(model => ({
        ...model,
        name: model.id,
        isLocal: false,
    }));

    return [
        ...ollamaModels,
        ...openAiModels,
    ];
};

export default useModels;
