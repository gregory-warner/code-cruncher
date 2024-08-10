import express from 'express';
import {getUserById, getUserByUsername} from "../services/userService.js";

const router = express.Router();

router.get("/:username", async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.get('/:userId', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.userId);
        return res.json(user);
    } catch (err) {
        next(err);
    }
});

router.delete("/:userId", async (req, res, next) => {
    const user = await getUserById(req.params.userId);
    await user.destroy();

    if (user.isSoftDeleted()) {
        return res.json({success: true});
    }

    return res.json({success: false});
});

export default router;