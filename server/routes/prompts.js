import express from 'express';
import {createPrompt, deletePrompt, updatePrompt} from "../services/promptService.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const newPrompt = await createPrompt(req.body);
        return res.json(newPrompt);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const deletedPrompt = await deletePrompt(req.params.id);
        return res.json(deletedPrompt);
    } catch (err) {
        next(err);
    }
});

router.patch("/update", async (req, res, next) => {
    try {
        const { actorId, prompt } = req.body;
        const actor = await updatePrompt(actorId, prompt);
        return res.json({actor});
    } catch (err) {
        next(err);
    }
});

export default router;