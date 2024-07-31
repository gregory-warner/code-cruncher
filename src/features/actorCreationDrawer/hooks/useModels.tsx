import {useGetModelsQuery} from "../../../services/openai/openaiApi";
import {useModelsQuery} from "../../../services/ollama/ollamaApi";

const useModels = () => {
    debugger;
    const { data: models } = useGetModelsQuery();
    const { data: ollama } = useModelsQuery();

    if (!models || !ollama) return [];

    return [
        ...models.data,
        ...ollama.models.map((model) => ({ name: `${model.name} (offline)` })),
    ];
};

export default useModels;
