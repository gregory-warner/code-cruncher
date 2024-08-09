import express from 'express';
import inputValidator from './validator.js';
import validator from 'validator';
import { Message, messengerTypeIds } from '../models/models.js'
const router = express.Router();
import logger from '../log/logger.js';
import { getActorById } from './actors.js';
import { getUserById } from './users.js';
import { Sequelize } from 'sequelize';

const getMessages = async (dialogId) => {
    return await Message.findAll({
        attributes: [
            ["message_id", "id"],
            ["dialog_id", "dialogId"],
            "content",
            ["time_created", "timeCreated"],
            ["messenger_id", "messengerId"],
            ["messenger_type_id", "messengerTypeId"],
            ["time_created", "timestamp"],
            "data",
            ["is_locked", "isLocked"],
        ],
        where: {
            dialog_id: dialogId,
            is_deleted: false,
        },
        order: [["message_id", "ASC"]]
    });
};

router.get("/getMessages/:dialogId", async (req, res, next) => {
    const dialogId = req.params.dialogId ?? -1;

    const messages = await getMessages(dialogId);
    
    res.json(messages);
});

const validateMessage = (message) => {
    if (!message.dialogId || !inputValidator.isNumber(message.dialogId)) {
        logger.error(`Unable to create message: invalid dialog ID`);
        return false;
    }

    if (!inputValidator.isNumber(message.messengerId)) {
        logger.error(`Unable to create message: invalid messenger ID`);
        return false;
    }

    if (!inputValidator.isNumber(message.messengerTypeId)) {
        logger.error(`Unable to create message: invalid message type ID`);
        return false;
    }

    return true;
}

router.post("/addMessage", async (req, res, next) => {
    try {
        const message = req.body.message;
        if (!validateMessage(message)) {
            res.status(500).json({"message": "Unable to add message"});
            return;
        }

        const content = validator.escape(message.content);

        const newMessage = await Message.create({
            "dialog_id": message.dialogId,
            "messenger_id": message.messengerId,
            "messenger_type_id": message.messengerTypeId,
            "content": content,
            "data": message.data,
        });

        if (!newMessage instanceof Message) {
            throw new Error('Unable to add new message');
        }

        res.json(newMessage.get({plain: true}));
    } catch (error) {
        next(error);
    }
});

router.get("/getMessenger", async (req, res) => {
    const messengerType = parseInt(req.query.messengerType) ?? 0;
    const messengerId = parseInt(req.query.messengerId) ?? 0;


    if (messengerType === messengerTypeIds.user) {
        const user = await getUserById(messengerId)
        if (messengerType === messengerTypeIds.actor) {
            const actor = await getActorById(messengerId);
            res.json(actor);
            return;
        }
        res.json(user);
        return;
    }

    res.json(null);
});

router.patch("/deleteMessage", async (req, res) => {
    const { messageId } = req.body;

    await Message.update({ is_deleted: true}, {
        where: {
            message_id: messageId,
        },
    });

    res.json({message: 'Successfully deleted message'});
});

router.patch("/updateMessage", async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const updatedMessage = {
        dialog_id: message.dialogId,
        messenger_id: message.messengerId,
        messenger_type_id: message.messengerTypeId,
        content: message.content,
        data: message.data,
        is_deleted: message.isDeleted ?? false,
        is_locked: message.isLocked ?? false,
    }

    await Message.update({ ...updatedMessage }, {
        where: {
            message_id: message.id,
        }
    });

    res.json({msg: 'Message was successfully updated'});
});

export default router;