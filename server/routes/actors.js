import express from 'express';
import {Actor} from '../models/models.js';
import {createActor, getActorByUsername, getActors, updateActorPrompt} from "../services/actorService.js";
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
        if (!req.file) {
            throw new Error('Avatar file is missing');
        }

        const actor = createActor({
            ...req.body,
            avatar: req.file.filename,
        });

        return res.json(actor);
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

        await updateActorPrompt(actorId, JSON.parse(prompt));
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

router.patch('/update-prompt', async (req, res, next) => {
    try {
        const { actorId, prompt } = req.body;
        const actor = await updateActorPrompt(actorId, prompt);
        return res.json({actor});
    } catch (err) {
        next(err);
    }
});

export default router;