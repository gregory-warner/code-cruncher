import {Actor, AIModel, ImageModel, LanguageModel, TextModel} from "../models/models.js";
import validator from "validator";
import {createLanguageModel, updateModelType} from "./languageModelService.js";

export const modelTypes = {
    language: 0,
    image: 1,
    text: 2,
};

export const getModelDetails = async (aiModel) => {
    switch (aiModel.modelTypeId) {
        case modelTypes.language:
            return await LanguageModel.findOne({ modelId: aiModel.modelId});
        case modelTypes.image:
            return await ImageModel.findOne({ modelId: aiModel.modelId});
        case modelTypes.text:
            return await TextModel.findOne({ modelId: aiModel.modelId});
        default:
            throw new Error(`Model with type id ${aiModel.modelTypeId} not found`);
    }
};

export const getValidatedModel = (model, requiredFields = ['modelName']) => {
    if (!model || typeof model !== 'object') {
        throw new Error('Invalid model data: ' + JSON.stringify(model));
    }

    const validatedPrompt = {};

    for (let field of requiredFields) {
        if (!(field in model)) {
            throw new Error(`Missing required field: ${field}`);
        }

        validatedPrompt[field] = model[field];
    }

    return validatedPrompt;
};

export const updateActorModel = async (actorId, model) => {
    if (!Number.isInteger(actorId)) {
        throw new Error('Invalid actor ID: ' + validator.escape(actorId.toString()));
    }

    const requiredParameters = ['modelName', 'isLocal', 'modelTypeId', 'modelIdentifier'];
    const validatedModel = getValidatedModel(model, requiredParameters);

    const actor = await Actor.findByPk(actorId);
    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    const aiModel = await AIModel.findByPk(model.modelId);
    if (!aiModel instanceof AIModel) {
        throw new Error(`Unable to create model with name ${model.modelName}`);
    }

    aiModel.modelName = model.modelName;
    aiModel.isLocal = model.isLocal;
    aiModel.modelIdentifier = model.modelIdentifier;
    aiModel.modelTypeId = model.modelTypeId;

    await aiModel.save();

    await updateModelType(model);

    return actor;
};

export const getValidatedAiModelData = (aiModel) => {
    const model = {};

    if (!['ollama', 'openai'].includes(aiModel.modelIdentifier)) {
        throw new Error(`Invalid model identifier: ${aiModel.modelIdentifier}`);
    }
    model.modelIdentifier = aiModel.modelIdentifier;

    const validModelName = /^[a-zA-Z0-9:_.\-\s]+$/;
    if (!validModelName.test(aiModel.modelName)) {
        throw new Error(`Invalid model name: ${aiModel.modelName}`);
    }
    model.modelName = aiModel.modelName;

    if (!Object.values(modelTypes).includes(aiModel.modelTypeId)) {
        throw new Error(`Invalid model type: ${aiModel.modelTypeId}`);
    }
    model.modelTypeId = aiModel.modelTypeId;

    if (typeof aiModel.isLocal !== 'boolean') {
        throw new Error(`model locality must be boolean: ${aiModel.isLocal}`);
    }
    model.isLocal = aiModel.isLocal;

    return model;
}

export const createAiModel = async (aiModel, transaction) => {
    const validatedModel = getValidatedAiModelData(aiModel);
    const model = await AIModel.create(validatedModel, transaction);

    if (aiModel.languageModel) {
        await createLanguageModel(model.modelId, aiModel.languageModel, transaction);
    }

    return model;
};

export const destroyActorAiModel = async (actor, transaction) => {
    await destroyModelType(actor.aiModel, transaction);
    await AIModel.destroy({ where: { modelId: actor.modelId }, transaction });
};

const destroyModelType = async (aiModel, transaction) => {
    if ('languageModel' in aiModel) {
        await LanguageModel.destroy({ where: { modelId: aiModel.modelId }}, transaction);
    }
}