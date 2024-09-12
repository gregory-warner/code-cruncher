import {AIModel, ModelType} from "../../../../types";
import useLanguageModelType from "./UseLanguageModelType";

const useModelType = (model: AIModel) => {
    switch (model.modelTypeId) {
        case ModelType.language:
            return useLanguageModelType(model.languageModel);
        default:
            return {};
    }
};

export default useModelType;