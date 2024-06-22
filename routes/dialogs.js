import express from 'express';
import logger from '../log/logger.js';
import { Dialog, Message } from '../models/models.js';
import validator from './validator.js';

const router = express.Router();

const getDialogId = async (actorId, userId) => {
    if (!validator.isNumber(Number.parseInt(actorId), 1) || !validator.isNumber(Number.parseInt(userId), 1)) {
        return -1;
    }

    const dialog = await Dialog.findOne({
        attributes: ['dialog_id'],
        where: {
            is_deleted: false,
            actor_id: actorId,
            user_id: userId,
        },
    });

    if (!(dialog instanceof Dialog)) {
        return -1;
    }

    return dialog.dialog_id;
};

const deleteDialogs = async (actorId, userId) => {
    if (!validator.isNumber(actorId, 1) || validator.isNumber(userId, 1)) {
        return -1;
    }

    const numRowsUpdated = await Dialog.update({ is_deleted: true }, {
        where: { actor_id: actorId, user_id: userId },
    });

    logger.info(`Deleted ${numRowsUpdated} dialog(s) with actor ID: ${actorId} and user ID ${userId}.`);
};

router.get("/getDialogId", async (req, res) => {
    const actorId = req.query.actorId ?? -1;
    const userId = req.query.userId ?? -1;
    const dialogId = await getDialogId(actorId, userId);
    if (validator.isNumber(Number.parseInt(dialogId), 0)) {
        res.json(dialogId);
        return;
    }

    res.json(null);
});

router.post("/createDialog", async (req, res, next) => {
    const { actorId, userId } = req.body;

    if (!validator.isNumber(Number.parseInt(actorId), 1) || !validator.isNumber(Number.parseInt(userId), 1)) {
        next("IDs must be greater than 1");
        return;
    }

    deleteDialogs(actorId, userId);

    const dialog = await Dialog.create({ "actor_id": actorId, "user_id": userId });
    if (!(dialog instanceof Dialog)) {
        next("Unable to create dialog");
        return;
    }

    res.json({dialogId: dialog.dialog_id});
});

router.patch("/deleteDialog/:dialogId", async (req, res) => {
    const dialogId = req.params.dialogId ?? -1;

    await Message.update({ is_deleted: true }, {
        where: {
            dialog_id: dialogId,
            is_deleted: false,
            is_locked: false,
        },
    });

    const dialogMessages = Message.findAll({
        where: {
            is_deleted: false,
            is_locked: false,
            dialog_id: dialogId,
        }
    });

    if (dialogMessages.length === 0) {
        // log
        await Dialog.update({ is_deleted: true}, {
            where: {
                dialog_id: dialogId,
                is_deleted: false,
            },
        });
    }

    res.json({msg: 'Successfully deleted dialog'});
});

export default router;