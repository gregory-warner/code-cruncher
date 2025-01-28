import {Actor, AIModel, Message, Prompt, SessionParticipant, User} from '../models/models.js';
import {removeProperty} from "../utils/utils.js";

export const getMessages = async (sessionId) => {
    return await Message.findAll({
        where: { sessionId },
        include: [
            {
                model: SessionParticipant,
                paranoid: false,
                as: 'participant',
                include: [
                    {
                        model: Actor,
                        as: 'actor',
                        paranoid: false,
                        include: [
                            { model: Prompt, required: true, paranoid: false },
                            { model: AIModel, as: 'aiModel', required: false },
                        ]
                    },
                    { model: User, as: 'user' }
                ],
            }
        ],
        order: [['messageId', 'ASC']],
    });
};

export const validateMessage = (message) => {
    const requiredFields = ['sessionId', 'sessionParticipantId', 'content'];

    for (const field of requiredFields) {
        if (!field in message) {
            throw new Error(`Message missing parameter '${field}'`);
        }
    }
}

export const getValidatedMessage = (message) => {
    let validatedMessage = {
        content: message.content,
        data: message.data,
    };

    if (!Number.isInteger(message.sessionId) || message.sessionId <= 0) {
        throw new Error('Unable to add message: invalid session ID');
    }
    validatedMessage.sessionId = message.sessionId;

    if (!Number.isInteger(message.sessionParticipantId) || message.sessionParticipantId <= 0) {
        throw new Error('Unable to add message: invalid session participant ID');
    }
    validatedMessage.sessionParticipantId = message.sessionParticipantId;

    if (!Number.isInteger(message.messageTypeId) || message.messageTypeId < 0) {
        throw new Error('Unable to add message: invalid session participant ID');
    }
    validatedMessage.sessionParticipantId = message.sessionParticipantId;

    return validatedMessage;
};

export const createMessage = async (message) => {
    const newMessage = await Message.create(getValidatedMessage(message));

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