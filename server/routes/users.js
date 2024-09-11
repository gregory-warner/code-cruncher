import express from 'express';
import {deleteUser, getUserById, getUserByUsername} from "../services/userService.js";

const router = express.Router();

router.get("/user/:username", async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        return res.json(user);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        return res.json(user);
    } catch (err) {
        next(err);
    }
});

export default router;