import {Actor, Prompt} from '../models/models.js';
import validator from 'validator';

export const getValidatedPrompt = (data, requiredFields = ['promptName', 'prompt', 'postfix']) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid prompt data: ' + JSON.stringify(data));
    }

    const validatedPrompt = {};
    // todo: add type validation

    for (let field of requiredFields) {
        if (!(field in data)) {
            throw new Error(`Missing required field: ${field}`);
        }

        validatedPrompt[field] = data[field];
    }

    return validatedPrompt;
};

export const createPrompt = async (data) => {
    getValidatedPrompt(data);

    return await Prompt.create(data);
};

export const deletePrompt = async (id) => {
    if (!Number.isInteger(id)) {
        throw new Error('Invalid prompt ID: ' + validator.escape(id.toString()));
    }

    const prompt = await Prompt.findByPk(id);
    if (!prompt instanceof Prompt) {
        throw new Error(`No prompt found with ID ${id}`);
    }

    await prompt.destroy();
    return prompt;
};

export const updatePrompt = async (actorId, data) => {
    if (!Number.isInteger(actorId)) {
        throw new Error('Invalid actor ID: ' + validator.escape(actorId.toString()));
    }

    const requiredParameters = ['prompt'];
    const validatedPrompt = getValidatedPrompt(data, requiredParameters);

    const actor = await Actor.findByPk(actorId);
    if (!actor instanceof Actor) {
        throw new Error(`Actor with id ${actorId} not found`);
    }

    const newPrompt = await Prompt.create(validatedPrompt);

    if (actor.promptId > 0) {
        await Prompt.destroy({ where: { promptId: actor.promptId } });
    }

    actor.promptId = newPrompt.promptId;

    await actor.save();

    return actor;
};