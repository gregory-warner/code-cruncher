import express from 'express';
import {getUserById, getUserByUsername} from "../services/userService.js";

const router = express.Router();

router.get("/:username", async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export default router;