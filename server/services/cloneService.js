import {Actor, AIModel, LanguageModel, Prompt} from "../models/models.js";
import {cloneModelType} from "./aiModelService.js";
import {createPrompt, getValidatedPrompt} from "./promptService.js";
import sequelize from "../db.js";

export const cloneActor = async (actorData) => {
    const { name, username, title, colorTheme, prompt, aiModel, avatar } = actorData;

    if (!name || !username || !title || !prompt || !colorTheme || !aiModel) {
        throw new Error('Missing required parameters');
    }

    const t = await sequelize.transaction();

    const actorPrompt = await clonePrompt(promp, transaction);

    const actorModel = await cloneModel(aiModel);

    return await Actor.create({
        name,
        username,
        avatar,
        colorTheme,
        title,
        promptId: actorPrompt.promptId,
        modelId: actorModel.modelId,
    });
};

export const clonePrompt = async (data, transaction) => {
    const promptData = getValidatedPrompt(data);
    return await Prompt.create(promptData, {transaction});
};

export const cloneModel = async (model) => {
    const aiModel = await AIModel.create({
        isLocal: model.isLocal,
        modelIdentifier: model.modelIdentifier,
        modelName: model.modelName,
        modelTypeId: model.modelTypeId,
    });

    if (!aiModel instanceof AIModel) {
        throw new Error(`unable to create AI Model with name ${model.modelName}`);
    }

    const typeModel = await cloneModelType({...model, modelId: aiModel.modelId});

    return {
        ...aiModel.toJSON(),
        modelType: {
            ...typeModel.toJSON(),
        }
    };
};

export const cloneModelType = async (model) => {
    if (model.modelTypeId === modelType.language && 'languageModel' in model) {
        await cloneLanguageModel(model.languageModel);
    }
};

export const cloneLanguageModel = async (model) => {
    return await LanguageModel.create({
        modelId: model.modelId,
        frequencyPenalty: model.frequencyPenalty,
        maxTokens: model.maxTokens,
        temperature: model.temperature,
    });
};