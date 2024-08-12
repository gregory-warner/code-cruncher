import express from 'express';
import logger from '../log/logger.js';
import { Dialog, Message } from '../models/models.js';
import validator from '../utils/validator.js';
import {transformKeys} from "../utils/utils.js";

const router = express.Router();

/**
 * Gets the most recent dialog ID for the actor and user.
 * @param {number} actorId - The ID of the actor.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<number>} - A promise that resolves with the dialog_id if found; otherwise throws an error.
 */
const getDialogId = async (actorId, userId) => {
    if (!validator.isNumber(Number.parseInt(actorId), 1) || !validator.isNumber(Number.parseInt(userId), 1)) {
        throw new Error('Invalid IDs');
    }

    const dialog = await Dialog.findOne({
        attributes: ['dialog_id'],
        where: {
            is_deleted: false,
            actor_id: actorId,
            user_id: userId,
        },
        order: [['dialog_id', 'DESC']],
        limit: 1,
    });

    if (!(dialog instanceof Dialog)) {
        throw new Error('Dialog not found');
    }

    return dialog.dialog_id;
};

/**
 * Soft deletes all dialogs associated with a specific actor and user by setting is_deleted to true.
 * @param {number} actorId - The ID of the actor.
 * @param {number} userId - The ID of the user.
 */
const deleteDialogs = async (actorId, userId) => {
    if (!validator.isNumber(actorId, 1) || !validator.isNumber(userId, 1)) {
        throw new Error('Invalid IDs');
    }

    const numRowsUpdated = await Dialog.update({ is_deleted: true }, {
        where: { actor_id: actorId, user_id: userId },
    });

    logger.info(`Deleted ${numRowsUpdated} dialog(s) with actor ID: ${actorId} and user ID ${userId}.`);
};

router.get("/getDialogId", async (req, res, next) => {
    try {
        const actorId = req.query.actorId;
        const userId = req.query.userId;

        if (!actorId || !userId) {
            throw new Error('Missing query parameters');
        }

        const dialogId = await getDialogId(Number.parseInt(actorId), Number.parseInt(userId));
        res.json(dialogId);
    } catch (error) {
        next(error.message);
    }
});

router.post("/createDialog", async (req, res, next) => {
    try {
        const { actorId, userId } = req.body;

        if (!actorId || !userId) {
            throw new Error('Missing request body parameters');
        }

        const dialog = await Dialog.create({ actor_id: actorId, user_id: userId });

        if (!(dialog instanceof Dialog)) {
            throw new Error('Unable to create dialog');
        }

        res.json({ dialogId: dialog.dialog_id });
    } catch (error) {
        next(error.message);
    }
});

router.get('/dialogIds', async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const actorId = req.query.actorId;

        const dialogs = await Dialog.findAll({
            where: {
                user_id: userId,
                actor_id: actorId,
                is_deleted: false,
            },
            attributes: ['dialog_id'],
        });

        const dialogIds = dialogs.map(dialog => dialog.dialog_id);

        res.status(200).json({ dialogIds });
    } catch (error) {
        console.error('Error fetching dialog IDs:', error);
        next(error.message);
    }
});

router.get('/dialogs', async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const actorId = req.query.actorId;

        const dialogs = await Dialog.findAll({
            where: {
                user_id: userId,
                actor_id: actorId,
                is_deleted: false,
            },
        });

        const transformedDialogs = dialogs.map(dialog => transformKeys(dialog.toJSON()));

        res.status(200).json({ dialogs: transformedDialogs });
    } catch (error) {
        console.error('Error fetching dialog IDs:', error);
        next(error.message);
    }
});

router.patch("/updateDialogName", async (req, res, next) => {
    try {
        const { dialogId, dialogName } = req.body;

        if (!dialogId || !dialogName) {
            throw new Error('Dialog ID and dialog name are required to update name');
        }

        const [numUpdatedRows, updatedRows] = await Dialog.update({ dialog_name: dialogName }, {
            where: {
                dialog_id: dialogId,
            },
        });

        if (numUpdatedRows === 0) {
            return res.status(404).json({ error: 'Dialog not found'});
        }

        const updatedRow = transformKeys(updatedRows[0]);

        res.json({updatedRow});
    } catch (error) {
        next(error);
    }
});

router.patch("/deleteDialog/:dialogId", async (req, res, next) => {
    try {
        const dialogId = req.params.dialogId;

        if (!dialogId) {
            throw new Error('Missing dialog ID');
        }

        await Message.update({ is_deleted: true }, {
            where: {
                dialog_id: dialogId,
                is_deleted: false,
                is_locked: false,
            },
        });

        const dialogMessages = await Message.findAll({
            where: {
                is_deleted: false,
                is_locked: false,
                dialog_id: dialogId,
            }
        });

        if (dialogMessages.length === 0) {
            await Dialog.update({ is_deleted: true }, {
                where: {
                    dialog_id: dialogId,
                    is_deleted: false,
                },
            });
        }

        res.json({ msg: 'Successfully deleted dialog' });
    } catch (error) {
        next(error.message);
    }
});

export default router;
