import {Message} from '../models/models.js';
import {removeProperty} from "../utils/utils.js";
import validator from "validator";

export const getMessages = async (sessionId) => {
    return await Message.findAll({
        where: { sessionId },
        order: [['messageId', 'ASC']],
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

export const deleteMessage = async (messageId) => {
    const message = await Message.findByPk(messageId);
    if (!message instanceof Message) {
        throw new Error(`Unable to find message with id ${messageId}`);
    }

    await message.destroy();
    return message;
}

export const updateMessage = async (message) => {
    const messageId = removeProperty(message, 'messageId');

    await Message.update({ ...message }, {
        where: { messageId }
    });

    return Message.findByPk(messageId);
};