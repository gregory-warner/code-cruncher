import {User} from "../models/models.js";
import inputValidator from "../routes/validator.js";
import validator from "validator";

export const getUserById = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user instanceof User) {
        throw new Error(`User with id ${userId} not found`);
    }

    return user;
};

export const getUserByUsername = async (username) => {
    if (!inputValidator.isUsername(username)) {
        throw new Error("Invalid username: " + validator.escape(username+""));
    }

    const user = await User.findOne({
        attributes: [
            "userId",
            "name",
            "username",
            "avatar",
            "colorTheme",
        ],
        where: {
            is_deleted: false,
            username: username,
        },
    });

    if (!user instanceof User) {
        throw new Error(`User with username ${username} not found`);
    }

    return user;
};