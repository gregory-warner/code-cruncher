import express from 'express';

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

export default router;