import express from 'express';
import { Prompt } from "../models/models.js";

const router = express.Router();

const deletePrompts = async (actorConfigurationId) => {
    await Prompt.update({is_deleted: true}, {
        where: {
            actor_configuration_id: actorConfigurationId,
        }
    });
};

// todo: rework
router.post("/updatePrompt", async (req, res, next) => {
    const { actorId, prompt } = req.body;

    // const actor = await ActorConfiguration.findOne({
    //     attributes: [["actor_configuration_id", "actorConfigurationId"]],
    //     where: {
    //         actor_id: actorId,
    //     }
    // });
    //
    // if (actor === null) {
    //     const error = new Error(`Actor Configuration not found for actor id ${actorId}`);
    //     error.status = 404;
    //     return next(error);
    // }
    //
    // const { actorConfigurationId } = actor.dataValues;
    //
    // await deletePrompts(actorConfigurationId);
    // await Prompt.create({ actor_configuration_id: actorConfigurationId, prompt });
    //
    // res.json({
    //     "result": 200,
    //     "message": "Actor prompt has been successfully updated.",
    // });
});

export default router;