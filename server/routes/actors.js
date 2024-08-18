import express from 'express';
import {Actor} from '../models/models.js';
import Prompt from '../models/prompt.js';
import {getActorByUsername, getActors, updateActorPrompt} from "../services/actorService.js";
import createUploadMiddleware from "../middlewares/uploadMiddleware.js";
import {addModel} from "../services/aiModelService.js";

const router = express.Router();

router.get("/", async (_, res, next) => {
    try {
        const actors = await getActors();
        return res.json(actors);
    } catch (error) {
        next(error);
    }
});

router.get("/actor/:username", async (req, res, next) => {
    try {
        const actor = await getActorByUsername(req.params.username)
        return res.json(actor);
    } catch (error) {
        next(error);
    }
});

router.post('/create', createUploadMiddleware('avatar'), async (req, res, next) => {
    try {
        const { name, username, title, colorTheme, prompt, model } = req.body;

        if (!name || !username || !title || !prompt || !colorTheme || !model) {
            throw new Error('Missing required parameters');
        }

        if (!req.file) {
            throw new Error('Avatar file is missing');
        }

        const avatar = req.file.filename;

        const actorPrompt = await Prompt.create({ ...JSON.parse(prompt) });

        const actorModel = await addModel(JSON.parse(model));

        const actor = await Actor.create({
            name,
            username,
            avatar,
            colorTheme,
            title,
            promptId: actorPrompt.promptId,
            modelId: actorModel.modelId,
        });

        res.json({actor});
    } catch (error) {
        next(error);
    }
});

router.post('/update', createUploadMiddleware('avatar'), async (req, res, next) => {
    try {
        const { actorId, name, username, title, colorTheme, prompt, model } = req.body;

        if (!name || !username || !title || !prompt || !colorTheme || !model) {
            throw new Error('Missing required parameters');
        }

        const avatar = req.file?.filename;

        await updateActorPrompt(actorId, prompt);
        // todo: model update is either search for existing details and set to that or create new, probably not delete previous

        const [rowsUpdated] = await Actor.update({
            name,
            username,
            avatar,
            colorTheme,
            title
        }, {
            where: {
                actor_id: actorId,
            },
        })

        if (rowsUpdated === 0) {
            return res.status(404).json({ msg: 'The actor was not found' });
        }


        res.json({ msg: 'The actor was successfully updated' });
    } catch (error) {
        next(error);
    }
});

// todo: determine if needed for default values
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