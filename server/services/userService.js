import {User} from "../models/models.js";
import inputValidator from "../utils/validator.js";
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

    const user = await User.findOne({ where: { username } });

    if (!user instanceof User) {
        throw new Error(`User with username ${username} not found`);
    }

    return user;
};

export const deleteUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user instanceof User) {
        throw new Error(`No user found with ID ${userId}`);
    }

    await user.destroy();
    return user;
}