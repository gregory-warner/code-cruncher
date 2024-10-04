import express from 'express';
import {Actor} from '../models/models.js';
import {createActor, getActorByUsername, getActors, update, updateAvatar} from "../services/actorService.js";
import createUploadMiddleware from "../middlewares/uploadMiddleware.js";
import {updatePrompt} from "../services/promptService.js";

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

router.post("/create", createUploadMiddleware("avatar"), async (req, res, next) => {
    try {
        if (!req.file) {
            throw new Error("Avatar file is missing");
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

router.patch("/update/:actorId", createUploadMiddleware("avatar"), async (req, res, next) => {
    try {
        const actorData = {
            ...req.body,
            avatar: req.file.filename,
        };

        const actor = update(parseInt(req.params.actorId), actorData);
        return res.json(actor);
    } catch (err) {
        next(err);
    }
});

router.patch("/avatar/:actorId", createUploadMiddleware("avatar"), async (req, res, next) => {
    try {
        const actorData = {
            ...req.body,
            avatar: req.file.filename,
        };

        const actor = updateAvatar(parseInt(req.params.actorId), actorData);
        return res.json(actor);
    } catch (err) {
        next(err);
    }
});

export default router;