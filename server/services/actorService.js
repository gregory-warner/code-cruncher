import {Actor, AIModel} from '../models/models.js';
import Prompt from '../models/prompt.js';
import {addModel, getModelDetails} from './aiModelService.js';
import inputValidator from '../utils/validator.js';
import validator from 'validator';
import {validatePromptParameters} from "./promptService.js";

export const getActors = async () => {
    return await Actor.findAll({
        include: [
            { model: Prompt, required: true },
            { model: AIModel, required: true, as: 'aiModel' },
        ],
    });
};

export const getActorById = async (actorId) => {
    const actor = await Actor.findByPk(actorId, {
        include: [
            { model: Prompt, required: true },
            { model: AIModel, required: true, as: 'aiModel' },
        ],
    });

    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    const modelDetails = await getModelDetails(actor.aiModel);

    let result = actor.toJSON();
    result.model = {
        ...actor.aiModel.toJSON(),
        ...(modelDetails?.toJSON() || {})
    };

    return result;
};

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

export const updateActorPrompt = async (actorId, data) => {
    if (!Number.isInteger(actorId)) {
        throw new Error('Invalid actor ID: ' + validator.escape(actorId.toString()));
    }

    validatePromptParameters(data);

    const actor = await Actor.findByPk(actorId);
    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    if (actor.promptId > 0) {
        await Prompt.destroy({ where: { promptId: actor.promptId } });
    }

    const newPrompt = await Prompt.create(data);
    actor.promptId = newPrompt.promptId;
    await actor.save();

    return actor;
};

export const getFirstActor = async () => {
    return await Actor.findOne({
        order: [['actorId', 'ASC']]
    });
};

export const createActor = async (actorData) => {
    const { name, username, title, colorTheme, prompt, model, avatar } = actorData;

    if (!name || !username || !title || !prompt || !colorTheme || !model) {
        throw new Error('Missing required parameters');
    }

    const actorPrompt = await Prompt.create({ ...JSON.parse(prompt) });

    const actorModel = await addModel(JSON.parse(model));

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
