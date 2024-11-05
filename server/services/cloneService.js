import {Actor, AIModel, LanguageModel, Prompt} from "../models/models.js";
import {getValidatedPrompt} from "./promptService.js";
import {getValidatedActorData} from "./actorService.js";
import {modelType} from "./aiModelService.js";

export const cloneActor = async (actorData, transaction) => {
    const actor = getValidatedActorData(actorData);

    const actorPrompt = await clonePrompt(actor.prompt, transaction);

    const actorModel = await cloneModel(actor.aiModel, transaction);

    return await Actor.create({
        name: actor.name,
        username: actor.username,
        avatar: actor.avatar,
        colorTheme: actor.colorTheme,
        title: actor.title,
        promptId: actorPrompt.promptId,
        modelId: actorModel.modelId,
    }, { transaction });
};

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
    console.log(model.modelTypeId );
    console.log('languageModel' in model);
    if (model.modelTypeId === modelType.language && 'languageModel' in model) {
        return await cloneLanguageModel(model.languageModel, transaction);
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