import {Message, MessageEventDetails, MessageQuestionType} from "../models/models.js";

export const addDetails = async (details) => {
    const questionId = parseInt(details.questionId ?? '');
    const messageId = parseInt(details.messageId ?? '');

    if (!questionId || !messageId) {
        throw new Error('Missing required parameters');
    }

    const eventDetails = await MessageEventDetails.create({
        questionId,
    });

    const message = await Message.findByPk(messageId);

    message.messageEventId = eventDetails.toJSON().messageEventId;

    message.save();

    return eventDetails;
};

export const addQuestionTypes = async (messageId, questionTypes) => {
    if (messageId <= 0 || questionTypes.length === 0) {
        throw new Error('Missing required parameters');
    }

    questionTypes.forEach(async (questionType) => {
        await MessageQuestionType.create({
            messageId,
            questionType,
        });
    });
}