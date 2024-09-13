import {AIModel, ModelType} from "../../../../types";
import useLanguageModelType from "./UseLanguageModelType";
import {ModelDataType} from "../../types";

const useModelType = (model: AIModel): ModelDataType|null => {
    switch (model.modelTypeId) {
        case ModelType.language:
            return useLanguageModelType(model.languageModel);
        default:
            return null;
    }
};

export default useModelType;