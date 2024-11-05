import {Actor, AIModel, ImageModel, LanguageModel, TextModel} from "../models/models.js";
import {removeProperty} from "../utils/utils.js";
import validator from "validator";

export const modelType = {
    language: 0,
    image: 1,
    text: 2,
};

export const getModelDetails = async (aiModel) => {
    switch (aiModel.modelTypeId) {
        case modelType.language:
            return await LanguageModel.findOne({ modelId: aiModel.modelId});
        case modelType.image:
            return await ImageModel.findOne({ modelId: aiModel.modelId});
        case modelType.text:
            return await TextModel.findOne({ modelId: aiModel.modelId});
        default:
            throw new Error(`Model with type id ${aiModel.modelTypeId} not found`);
    }
};

/**
 * Adds a model to the database. parameter needs to have a typeDetails property with the expected values
 * for the model type e.g. ('size', 'num', 'quality', 'style') for ImageModel type.
 *
 * @param model
 * @returns {Promise<{success: boolean, model: any}>}
 */
export const addModel = async (model, transaction) => {
    if (!'typeDetails' in model) {
        throw new Error(`missing typeDetails for model with name ${model.name}`);
    }

    const modelProviderDetails = getModelProviderDetails(model);

    const aiModel = await AIModel.create(modelProviderDetails, { transaction });

    if (!aiModel instanceof AIModel) {
        throw new Error(`unable to create AI Model with type ${modelProviderDetails.modelTypeId} and name ${model.name}`);
    }

    const typeDetails = {
        ...model.typeDetails,
        modelId: aiModel.modelId,
    };

    const typeModel = await createTypeModel(modelProviderDetails.modelTypeId, typeDetails, transaction);

    return {
        ...aiModel.toJSON(),
        modelType: {
            ...typeModel.toJSON(),
        }
    };
};

const createTypeModel = async (typeId, typeDetails, transaction) => {
    switch (typeId) {
        case modelType.language:
            return await LanguageModel.create({
                ...typeDetails,
            }, { transaction });
        case modelType.image:
            return await ImageModel.create({
                ...typeDetails,
            });
        case modelType.text:
            return await TextModel.create({
                ...typeDetails,
            });
        default:
            throw new Error(`unable to create type model with model id ${typeDetails.modelId}`);
    }
};

const getModelProviderDetails = (model) => {
    const typeId = modelType[getModelType(model)];

    const ollamaModel = 'details' in model;
    const openaiModel = 'object' in model && 'owned_by' in model;

    if (ollamaModel) {
        return {
            modelName: model.name,
            modelIdentifier: 'ollama',
            modelTypeId: typeId,
            isLocal: true,
        };
    }

    if (openaiModel) {
        return {
            modelName: model.id,
            modelIdentifier: 'openai',
            modelTypeId: typeId,
            isLocal: false,
        };
    }

    throw new Error(`Unable to determine model provider for model id ${model.id}`);
};

export const getModelType = (model) => {
    const typeDetails = model.typeDetails;

    if ('size' in typeDetails && 'quality' in typeDetails) {
        return 'image';
    }

    if ('maxTokens' in typeDetails && 'temperature' in typeDetails) {
        return 'language';
    }

    throw new Error('Missing required fields for type details');
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


export const createModelType = async (modelId, model) => {
    if (model.languageModel) {
        const languageModel = getValidatedModel(model.languageModel, ['maxTokens', 'temperature', 'frequencyPenalty']);
        return await LanguageModel.create({
            modelId,
            ...languageModel,
        });
    }

    throw new Error(`Unable to create model type with model id ${modelId}`);
};

const updateLanguageModel = async (model) => {
    const languageModel = await LanguageModel.findOne({ where: { modelId: model.modelId } });
    const lang = model.languageModel;
    languageModel.maxTokens = lang.maxTokens;
    languageModel.temperature = lang.temperature;
    languageModel.frequencyPenalty = lang.frequencyPenalty;
    await languageModel.save();
};

const updateModelType = async (model) => {
    if (model.languageModel) {
        await updateLanguageModel(model);
    }
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

    updateModelType(model);

    return actor;
};