import {Actor, AIModel} from "../models/models.js";
import Prompt from "../models/prompt.js";
import {getModelDetails} from "./aiModelService.js";
import inputValidator from "../utils/validator.js";
import validator from "validator";

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
            { model: AIModel, required: true },
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
        throw new Error("Invalid username: " + validator.escape(username+""));
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
        throw new Error("Invalid actor ID: " + validator.escape(actorId.toString()));
    }

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
