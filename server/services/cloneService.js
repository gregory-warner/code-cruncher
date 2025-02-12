import {Actor, AIModel, LanguageModel, Prompt} from "../models/models.js";
import {getValidatedPrompt} from "./promptService.js";
import {getActor, getValidatedActorData} from "./actorService.js";
import {modelTypes} from "./aiModelService.js";
import sequelize from "../db.js";

export const cloneActor = async (actorData) => {
    const actor = getValidatedActorData(actorData);
    const transaction = await sequelize.transaction();

    try {
        const actorModel = await cloneModel(actor.aiModel, transaction);

        const newActor = await Actor.create({
            name: actor.name,
            username: actor.username,
            avatar: actor.avatar,
            colorTheme: actor.colorTheme,
            title: actor.title,
            modelId: actorModel.modelId,
        }, {transaction});

        const promptData = {
            ...actor.prompt,
            actorId: newActor.actorId,
        }

        await clonePrompt(promptData, transaction);

        await transaction.commit();

        return getActor(newActor.actorId);
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export const clonePrompt = async (data, transaction) => {
    const promptData = getValidatedPrompt(data);
    return await Prompt.create(promptData, {transaction});
};

export const cloneModel = async (model, transaction) => {
    const aiModel = await AIModel.create({
        isLocal: model.isLocal,
        modelIdentifier: model.modelIdentifier,
        modelName: model.modelName,
        modelTypeId: model.modelTypeId,
    }, { transaction });

    if (!aiModel instanceof AIModel) {
        throw new Error(`unable to create AI Model with name ${model.modelName}`);
    }

    const typeModel = await cloneModelType({...model, modelId: aiModel.modelId}, transaction);

    return {
        ...aiModel.toJSON(),
        modelType: {
            ...typeModel.toJSON(),
        }
    };
};

export const cloneModelType = async (model, transaction) => {
    if (model.modelTypeId === modelTypes.language && 'languageModel' in model) {
        return await cloneLanguageModel({ ...model.languageModel, modelId: model.modelId }, transaction);
    }
};

export const cloneLanguageModel = async (model, transaction) => {
    return await LanguageModel.create({
        modelId: model.modelId,
        frequencyPenalty: model.frequencyPenalty,
        maxTokens: model.maxTokens,
        temperature: model.temperature,
    }, {transaction});
};