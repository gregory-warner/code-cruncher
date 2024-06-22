import express from 'express';
import { User, UserConfiguration } from '../models/models.js';
import inputValidator from './validator.js';
import validator from 'validator';

const router = express.Router();

router.get("/getUser/:username", async (req, res, next) => {
    const username = req.params.username ?? null;
    if (!inputValidator.isUsername(username)) {
        next("Invalid username: "+validator.escape(username+""));
    }

    const user = await User.findOne({
        attributes: [["user_id", "userId"], "name", "username"],
        where: {
            is_deleted: false,
            username: username,
        },
        include: [{
            model: UserConfiguration,
            as: "configuration",
            attributes: [["color_theme", "colorTheme"], "avatar"],
        }],
    });

    if (user instanceof User) {
        res.json(user);
        return;
    }
    res.json(null);
});

export const getUserById = async (userId) => {
    return await User.findOne({
        attributes: [["user_id", "userId"], "name", "username"],
        where: {
            is_deleted: false,
            user_id: userId,
        },
        include: [{
            model: UserConfiguration,
            as: "configuration",
            attributes: [["color_theme", "colorTheme"], "avatar"],
        }],
    });
};

export default router;