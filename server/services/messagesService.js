import {Actor, Message, User} from '../models/models.js';
import {messengerTypeIds, removeProperty} from "../utils/utils.js";
import validator from "validator";
import {Sequelize} from "sequelize";

export const getMessages = async (sessionId) => {
    return await Message.findAll({
        where: { sessionId },
        order: [['messageId', 'ASC']],
        include: [
            { model: User, required: false, where: { id: Sequelize.col('Message.messengerId'), messengerTypeId: messengerTypeIds.user } },
            { model: Actor, required: false, where: { id: Sequelize.col('Message.messengerId'), messengerTypeId: messengerTypeIds.assistant } }
        ]
    });
};

export const validateMessage = (message) => {
    const requiredFields = ['sessionId', 'messengerId', 'messengerTypeId', 'content'];

    for (const field of requiredFields) {
        if (!field in message) {
            throw new Error(`Message missing parameter '${field}'`);
        }
    }
}

export const createMessage = async (message) => {
    validateMessage(message)

    const newMessage = await Message.create({
        sessionId: message.sessionId,
        messengerId: message.messengerId,
        messengerTypeId: message.messengerTypeId,
        content: validator.escape(message.content),
        messageTypeId: message.messageTypeId,
        data: message.data ?? {},
    });

    if (!newMessage instanceof Message) {
        throw new Error('Error creating message');
    }

    return newMessage;
};

export const deleteMessage = (messageId) => {
    const message = Message.findByPk(messageId);
    if (!message instanceof Message) {
        throw new Error(`Unable to find message with id ${messageId}`);
    }

    message.destroy();
    return message;
}

export const updateMessage = async (message) => {
    const messageId = removeProperty(message, 'messageId');

    await Message.update({ ...message }, {
        where: { messageId }
    });

    return message;
};