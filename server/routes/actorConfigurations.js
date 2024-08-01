import express from 'express';
import { ActorConfiguration } from '../models/models.js';

const router = express.Router();

router.patch("/updateChatModel", async (req, res) => {
    const { actorId, model } = req.body;
    await ActorConfiguration.update({ chat_model: model}, {
        where: {
            actor_id: actorId,
            is_deleted: false,
        },
    });
});

router.patch("/updateTtsModel", async (req, _) => {
    const { actorId, model } = req.body;

    await ActorConfiguration.update({ tts_model: model}, {
        where: {
            actor_id: actorId,
            is_deleted: false,
        },
    });
});

router.post("/updatePrompt", async (req, res) => {
    const { actorId, prompt } = req.body;

    await ActorConfiguration.update({ prompt }, {
        where: {
            actor_id: actorId,
        },
    });

    res.json({
        "result": 200,
        "message": "Actor prompt has been successfully updated.",
    });
});

router.post('/updateTitle', async (req, res, next) => {
    try {
        const { actorId, title } = req.body;

        await ActorConfiguration.update({ title }, {
            where: {
                actor_id: actorId,
            }
        });

        res.status(200).json({message: "Actor title has been successfully updated."});
    } catch (error) {
        next(error);
    }
});

router.get("/getConfig/:actorId", async (req, res) => {
    const actorId = req.params.actorId ?? -1;
    if (actorId <= 0) {
        res.json("");
        return;
    }

    const config = await ActorConfiguration.findOne({
        attributes: [["chat_model", "chatModel"], "avatar", ["color_theme", "colorTheme"], "title", "prompt", ["tts_model", "ttsModel"]],
        where: {
            is_deleted: false,
            actor_id: actorId
        },
    });

    res.json(config);
})

export default router;