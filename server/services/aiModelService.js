import {AIModel, ImageModel, LanguageModel, TextModel} from "../models/models.js";

const modelType = {
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

export const addModel = async (model) => {
    const ollamaModel = 'digest' in model && 'details' in model;
    const openaiModel = 'object' in model && 'owned_by' in model;

    if (ollamaModel) {
        return addOllamaModel(model);
    }
};

const addOllamaModel = async (model) => {
    const typeId = modelType[getModelType(model)];

    const aiModel = await AIModel.create({
        modelName: model.name,
        modelIdentifier: model.digest,
        modelTypeId:typeId,
        isLocal: true,
    });

    if (!aiModel instanceof AIModel) {
        throw new Error(`unable to create AI Model with type ${typeId} and name ${model.name}`);
    }

    if (!'typeDetails' in model) {
        throw new Error(`missing type details for model with name ${model.name}`);
    }

    const typeModel = await createTypeModel({
        ...model.typeDetails,
        modelId: aiModel.modelId,
        typeId,
    });

    const newModel = {
        ...aiModel.toJSON(),
        type: {
            ...typeModel.toJSON(),
        }
    }

    return { success: true, model: newModel };
};

const createTypeModel = async (typeDetails) => {
    switch (typeDetails.typeId) {
        case modelType.language:
            return await LanguageModel.create({
                ...model.typeDetails,
            });
        case modelType.image:
            return await ImageModel.create({
                ...model.typeDetails,
            });
        case modelType.text:
            return await TextModel.create({
                ...model.typeDetails,
            });
        default:
            throw new Error(`unable to create type model with model id ${typeDetails.modelId}`);
    }
};

export const getModelProviderDetails = async (model) => {

    if ('digest' in model && 'details' in model) {
        return {
            provider: 'ollama',
            name: model.name,
            identifier: model.digest,
            type,
            isLocal: true,
        };
    }

    if ('object' in model && 'owned_by' in model) {
        return {
            provider: 'openai',
            name: model.id,
            identifier: model.id,
            type,
            isLocal: false,
        };
    }

    throw new Error(`Unable to find model provider for model with name ${model.modelName ?? 'N/A'}`);
}

// todo: add additional logic to determine model type
export const getModelType = (model) => {
    if (model.id?.includes('dall-e')) {
        return 'image';
    }

    return 'language';
}