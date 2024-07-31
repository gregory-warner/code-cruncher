import {useGetModelsQuery} from "../../../services/openai/openaiApi";
import {useModelsQuery} from "../../../services/ollama/ollamaApi";

const useModels = () => {
    const { data: ollama } = useModelsQuery();
    const { data: models } = useGetModelsQuery();

    if (!models || !ollama) return [];

    return [
        ...ollama.models,
        ...models.data,
    ];
};

export default useModels;
