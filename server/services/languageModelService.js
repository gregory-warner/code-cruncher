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

    const lang = await LanguageModel.create({ modelId });

    lang.maxTokens = modelType.maxTokens;
    lang.temperature = modelType.temperature;
    lang.frequencyPenalty = modelType.frequencyPenalty;

    await lang.save();
    return  lang;
};

const updateLanguageModel = async (model) => {
    const languageModel = await LanguageModel.findOne({ where: { modelId: model.modelId } });
    const lang = model.languageModel;
    languageModel.maxTokens = lang.maxTokens;
    languageModel.temperature = lang.temperature;
    languageModel.frequencyPenalty = lang.frequencyPenalty;
    await languageModel.save();
};

export const updateModelType = async (model) => {
    if (model.languageModel) {
        await updateLanguageModel(model);
    }
};