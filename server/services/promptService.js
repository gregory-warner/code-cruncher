import {Actor, Prompt} from '../models/models.js';
import validator from 'validator';

export const getValidatedPrompt = (data, requiredFields = ['promptName', 'prompt', 'postfix', 'actorId']) => {
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

export const createPrompt = async (data, transaction) => {
    const promptData = getValidatedPrompt(data);
    return await Prompt.create(promptData, { transaction });
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

    const requiredParameters = ['prompt', 'promptName', 'postfix'];
    const validatedPrompt = getValidatedPrompt(data, requiredParameters);

    Prompt.destroy({ where: { actorId } });

    return await Prompt.create({
        ...validatedPrompt,
        actorId,
    });
};

export const getAllPrompts = async (actorId) => {
    return await Prompt.findAll({
        where: {
            actorId
        },
        paranoid: true,
    });
};

export const deleteActorPrompts = async (actorId, transaction) => {
    const prompts = await Prompt.findAll({ where: { actorId } });
    prompts.forEach(async (prompt) => await prompt.destroy(transaction));
};