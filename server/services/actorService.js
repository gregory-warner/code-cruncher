import {Actor, ImageModel, LanguageModel} from "../models/models.js";
import Prompt from "../models/prompt.js";

export const getActors = async () => {
    return await Actor.findAll({
        include: [
            {
                model: Prompt,
                required: true,
            },
            {
                model: LanguageModel,
                required: false,
                where: {
                    '$Actor.model_type_id$': 0
                }
            },
            {
                model: ImageModel,
                required: false,
                where: {
                    '$Actor.model_type_id$': 1
                }
            },
        ],
    });
};