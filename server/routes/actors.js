import express from 'express';
import {Actor} from '../models/models.js';
import Prompt from '../models/prompt.js';
import {getActorByUsername, getActors} from "../services/actorService.js";
import createUploadMiddleware from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.get("/", async (_, res, next) => {
    try {
        const actors = await getActors();
        return res.json(actors);
    } catch (error) {
        next(error);
    }
});

router.get("/getActor/:username", async (req, res, next) => {
    try {
        const actor = await getActorByUsername(req.params.username)
        return res.json(actor);
    } catch (error) {
        next(error);
    }
});

router.post('/create', createUploadMiddleware('avatar'), async (req, res, next) => {
    try {
        const { name, title, prompt, messageCard, ttsModel, chatModel } = req.body;

        if (!name || !title || !prompt || !messageCard || !ttsModel || !chatModel) {
            throw new Error('Missing required parameters');
        }

        const username = name.toLowerCase().split(' ').join('_');
        const actor = await Actor.create({ name, username });

        if (!req.file) {
            throw new Error('Avatar file is missing');
        }

        const fileName = req.file.filename;
        let color = getMessageCardStyle(messageCard);

        const config = await ActorConfiguration.create({
                actor_id: actor.actor_id,
                avatar: fileName,
                color_theme: { messageCard: color },
                title,
                chat_model: chatModel,
                tts_model: ttsModel
            }
        );

        await Prompt.create({actor_configuration_id: config.actor_configuration_id, prompt });

        res.json({ msg: 'The actor was successfully created' });
    } catch (error) {
        next(error);
    }
});

router.post('/update', upload.single('avatar'), async (req, res, next) => {
    try {
        const {name, title, prompt, ttsModel, chatModel, actorId, messageCard} = req.body;

        console.log(req.body);
        // if (!name || !title || !prompt || !chatModel || !actorId || !messageCard) {
        //     throw new Error('Missing required parameters');
        // }

        const username = name.toLowerCase().split(' ').join('_');

        const [rowsUpdated] = await Actor.update({name, username}, {
            where: {
                actor_id: actorId,
            },
        })

        if (rowsUpdated === 0) {
            return res.status(404).json({ msg: 'The actor was not found' });
        }

        let color = getMessageCardStyle(messageCard);

        const [_, [updatedConfig]] = await ActorConfiguration.update({
                title,
                chat_model: chatModel,
                tts_model: ttsModel ?? '',
                messageCard: color,
                avatar: req.file ? req.file.filename : undefined,
            }, {
                where: {
                    actor_id: actorId,
                },
                returning: true,
            }
        );

        const config_id = updatedConfig?.actor_configuration_id;

        if (!config_id) {
            throw new Error('Unable to get actor config id');
        }

        await Prompt.update({ is_deleted: true }, { where: { actor_configuration_id: config_id } });

        await Prompt.create({actor_configuration_id: config_id, prompt });

        res.json({ msg: 'The actor was successfully updated' });
    } catch (error) {
        next(error);
    }
});

const getMessageCardStyle = (messageCard) => {
    let color = JSON.parse(messageCard);
    color.transform = "translateY(-5px)";
    color.borderRadius = "5px";
    color.border = "4px solid #ccc";
    color.transition = "all 0.3s ease-in-out";
    color.width = "100%";
    color["&:hover"] = {
        boxShadow: "0px 0px 8px 3px rgba(255,255,0,0.5)",
    };

    return color;
};

export default router;