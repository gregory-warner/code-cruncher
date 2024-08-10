import {ImageModel, LanguageModel, TextModel} from "../models/models.js";

export const getModelDetails = async (aiModel) => {
    switch (aiModel.modelTypeId) {
        case 0:
            return await LanguageModel.findOne({ modelId: aiModel.modelId});
        case 1:
            return await ImageModel.findOne({ modelId: aiModel.modelId});
        case 2:
            return await TextModel.findOne({ modelId: aiModel.modelId});
        default:
            throw new Error(`Model with type id ${aiModel.modelTypeId} not found`);
    }
};