import {AIModel, ImageModel, LanguageModel, TextModel} from "../models/models.js";
import {removeProperty} from "../utils/utils.js";

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

/**
 * Adds a model to the database. parameter needs to have a typeDetails property with the expected values
 * for the model type e.g. ('size', 'num', 'quality', 'style') for ImageModel type.
 *
 * @param model
 * @returns {Promise<{success: boolean, model: any}>}
 */
export const addModel = async (model) => {
    if (!'typeDetails' in model) {
        throw new Error(`missing typeDetails for model with name ${model.name}`);
    }

    const modelProviderDetails = getModelProviderDetails(model);

    const aiModel = await AIModel.create(modelProviderDetails);

    if (!aiModel instanceof AIModel) {
        throw new Error(`unable to create AI Model with type ${typeId} and name ${model.name}`);
    }

    const typeDetails = {
        ...model.typeDetails,
        modelId: aiModel.modelId,
        typeId,
    };

    const typeModel = await createTypeModel(typeDetails);

    return {
        ...aiModel.toJSON(),
        modelType: {
            ...typeModel.toJSON(),
        }
    };
};

const createTypeModel = async (typeDetails) => {
    const typeId = removeProperty(typeDetails, 'typeId');

    switch (typeId) {
        case modelType.language:
            return await LanguageModel.create({
                ...typeDetails,
            });
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

    const ollamaModel = 'digest' in model && 'details' in model;
    const openaiModel = 'object' in model && 'owned_by' in model;

    if (ollamaModel) {
        return {
            modelName: model.name,
            modelIdentifier: model.digest,
            modelTypeId: typeId,
            isLocal: true,
        };
    }

    if (openaiModel) {
        return {
            modelName: model.id,
            modelIdentifier: model.id,
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

    return 'language';
}