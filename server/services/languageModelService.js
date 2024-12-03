import {LanguageModel} from "../models/models.js";

const getValidatedLanguageModel = (languageModel) => {
    const model = {};
    if (Number.isFinite(languageModel.maxTokens)) {
        model.maxTokens = languageModel.maxTokens;
    }
    if (Number.isFinite(languageModel.temperature)) {
        model.temperature = languageModel.temperature;
    }
    if (Number.isFinite(languageModel.frequencyPenalty)) {
        model.frequencyPenalty = languageModel.frequencyPenalty;
    }

    return model;
};

export const createLanguageModel = async (modelId, languageModel, transaction) => {
    if (modelId <= 0) {
        throw new Error('model id is required');
    }

    const modelType = getValidatedLanguageModel(languageModel);

    if (Object.keys(modelType).length !== 3) {
        throw new Error(`Unable to create language model: insufficient property count.`);
    }

    modelType.modelId = modelId;

    return await LanguageModel.create(modelType, transaction);
};