import {useModelsQuery} from "../../../services/ollama/ollamaApi";
import {useOpenaiModelsQuery} from "../../../services/openai/openaiApi";

const useModels = () => {
    const { data: ollama } = useModelsQuery();
    const { data: models } = useOpenaiModelsQuery();

    if (!models || !ollama) return [];

    return [
        ...ollama.models,
        ...models.data,
    ];
};

export default useModels;
