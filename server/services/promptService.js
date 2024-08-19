import {Prompt} from '../models/models.js';
import validator from 'validator';

export const validatePromptParameters = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid prompt data: ' + JSON.stringify(data));
    }

    const requiredFields = ['promptName', 'prompt', 'postfix'];
    for (let field of requiredFields) {
        if (!(field in data)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (typeof data.promptName !== 'string' || !validator.isLength(data.promptName, { min: 1 })) {
        throw new Error('Invalid prompt name: ' + validator.escape(data.promptName+''));
    }

    if (typeof data.prompt !== 'string' || !validator.isLength(data.prompt, { min: 1 })) {
        throw new Error('Invalid prompt text: ' + validator.escape(data.prompt+''));
    }

    if (typeof data.postfix !== 'string' || !validator.isLength(data.postfix, { min: 1 })) {
        throw new Error('Invalid postfix text: ' + validator.escape(data.postfix+''));
    }
};

export const createPrompt = async (data) => {
    validatePromptParameters(data);

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
