import {Actor, AIModel, LanguageModel, SessionParticipant} from '../models/models.js';
import Prompt from '../models/prompt.js';
import {createAiModel, updateActorModel} from './aiModelService.js';
import inputValidator from '../utils/validator.js';
import validator from 'validator';
import {createPrompt, updatePrompt} from "./promptService.js";
import sequelize from "../db.js";

export const getActors = async () => {
    return await Actor.findAll({
        include: [
            { model: Prompt, required: true },
            {
                model: AIModel,
                required: true,
                as: 'aiModel',
                include: [
                    { association: 'languageModel' },
                    { association: 'imageModel' },
                    { association: 'textModel' },
                ],
            },
        ],
    });
};

export const getActor = async (actorId) => {
    return await Actor.findOne({
        where: { actorId: actorId },
        include: [
            { model: Prompt, required: true },
            {
                model: AIModel,
                required: true,
                as: 'aiModel',
                include: [
                    { association: 'languageModel' },
                    { association: 'imageModel' },
                    { association: 'textModel' },
                ],
            },
        ],
    })
}

export const getActorByUsername = async (username) => {
    if (!inputValidator.isUsername(username)) {
        throw new Error('Invalid username: ' + validator.escape(username+''));
    }

    return await Actor.findOne({
        where: {
            is_deleted: false,
            username: username
        },
    });
};

export const getValidatedActorData = (actorData, requiredParams = []) => {
    const actor = {};

    const properties = ['name', 'username', 'title', 'colorTheme', 'prompt', 'aiModel', 'avatar'];
    requiredParams = requiredParams.length === 0 ? properties : requiredParams;
    const validString = /^[a-zA-Z0-9_.\-\s]+$/;

    if (requiredParams.includes('name') && (!actorData.name || !validString.test(actorData.name))) {
        throw new Error(`Invalid name: ${validator.escape(actorData.name)}`);
    }
    actor.name = actorData.name;

    if (requiredParams.includes('username') && (!actorData.username || !validString.test(actorData.username))) {
        throw new Error(`Invalid username: ${validator.escape(actorData.username)}`);
    }
    actor.username = actorData.username;

    if (requiredParams.includes('title') && (!actorData.title || !validString.test(actorData.title))) {
        throw new Error(`Invalid title: ${validator.escape(actorData.title)}`);
    }
    actor.title = actorData.title;

    // TODO: refine
    if (requiredParams.includes('colorTheme') && !actorData.colorTheme) {
        throw new Error(`Invalid color theme`);
    }
    const colorRegex = /^[{}a-zA-Z0-9#]+$/;
    const colorTheme = typeof actorData.colorTheme === 'object'
        ? actorData.colorTheme
        : JSON.parse(actorData.colorTheme);
    actor.colorTheme = colorTheme;

    // TODO: refine
    if (requiredParams.includes('prompt') && !actorData.prompt) {
        throw new Error(`prompt is required`);
    }
    const prompt = typeof actorData.prompt === 'object'
        ? actorData.prompt
        : JSON.parse(actorData.prompt);
    actor.prompt = prompt;

    // TODO: refine
    if (requiredParams.includes('aiModel') && !actorData.aiModel) {
        throw new Error(`AI model is required`);
    }
    const aiModel = typeof actorData.aiModel === 'object'
        ? actorData.aiModel
        : JSON.parse(actorData.aiModel);
    actor.aiModel = aiModel;

    return actor;
};

export const createActor = async (actorData) => {
    const actor = getValidatedActorData(actorData);

    const transaction = await sequelize.transaction();

    const actorPrompt = await createPrompt(actor.prompt, transaction);
    if (!actorPrompt instanceof Prompt || actorPrompt.promptId === 0) {
        throw new Error('Unable to create actor prompt');
    }

    const actorModel = await createAiModel(actor.aiModel, transaction);
    if (!actorModel instanceof AIModel || actorModel.modelId === 0) {
        throw new Error('Unable to create actor model');
    }

    const newActor = await Actor.create({
        name: actor.name,
        username: actor.username,
        colorTheme: actor.colorTheme,
        title: actor.title,
        promptId: actorPrompt.promptId,
        modelId: actorModel.modelId,
    }, { transaction });

    await transaction.commit();

    return newActor;
};

export const update = async (actorId, actorData) => {
    if (!Number.isInteger(actorId)) {
        throw new Error('Invalid actor ID: ' + validator.escape(actorId.toString()));
    }

    const validatedActorData = getValidatedActorData(actorData, [
        'name',
        'title',
        'colorTheme',
    ]);

    const actor = await Actor.findByPk(actorId);
    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    actor.name = validatedActorData.name;
    actor.title = validatedActorData.title;
    actor.colorTheme = validatedActorData.colorTheme;

    await actor.save();

    if (actorData.aiModel) {
        await updateActorModel(actorId, actorData.aiModel);
    }

    if (actorData.prompt) {
        await updatePrompt(actorId, actorData.prompt);
    }

    return actor;
};

export const updateAvatar = async (actorId, actorData) => {


    if (parseInt(actorId) <= 0) {
        throw new Error('Invalid actor ID: ' + validator.escape(actorId.toString()));
    }

    const validString = /^[a-zA-Z0-9_.\-\s]+$/;
    if (!validString.test(actorData.avatar)) {
        throw new Error(`Invalid avatar name: ${validator.escape(actorData.avatar)}`);
    }

    const actor = await Actor.findByPk(actorId);
    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    actor.avatar = actorData.avatar;

    await actor.save();

    return actor;
};

export const deleteActor = async (actorId) => {
    if (!Number.isInteger(actorId) || actorId === 0) {
        throw new Error('ID must be greater than 0');
    }

    const transaction = await sequelize.transaction();

    const actor = await getActor(actorId);

    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    const prompt = await Prompt.findByPk(actor.promptId);
    const modelType = 'languageModel' in actor.aiModel ? await LanguageModel.findOne({ where: {modelId: actor.modelId }}) : null;
    if (modelType) {
        await modelType.destroy({transaction});
    }

    await actor.destroy({transaction});
    await prompt.destroy({transaction});
    await AIModel.destroy({ where: { modelId: actor.modelId }, transaction });

    await SessionParticipant.destroy({ where: { participantTypeId: 1, participantId: actorId }, transaction })

    await transaction.commit();

    return actor;
};