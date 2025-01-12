import {Message, MessageEventDetails, MessageQuestionType, Session} from "../models/models.js";

const getValidatedDetails = (details) => {
    const validatedDetails = {};

    if (!Number.isInteger(details.questionId)) {
        throw new Error("Missing required parameter 'questionId'");
    }
    validatedDetails.questionId = details.questionId;

    if (!Number.isInteger(details.messageId)) {
        throw new Error("Missing required parameter 'messageId'");
    }
    validatedDetails.messageId = details.messageId;

    if (Number.isInteger(details.resultId)) {
        validatedDetails.resultId = details.resultId;
    }

    return validatedDetails;
};

export const addDetails = async (details) => {
    const validatedDetails = getValidatedDetails(details);

    if (!Number.isInteger(details.messageId)) {
        throw new Error("Missing required parameter 'messageId'");
    }

    const eventDetails = await MessageEventDetails.create(validatedDetails);

    const message = await Message.findByPk(details.messageId);

    message.messageEventId = eventDetails.toJSON().messageEventId;

    message.save();

    return eventDetails;
};

export const addQuestionTypes = async (messageEventId, questionTypes) => {
    if (messageEventId <= 0 || questionTypes.length === 0) {
        throw new Error('Missing required parameters');
    }

    questionTypes.forEach(async (questionType) => {
        await MessageQuestionType.create({
            messageEventId,
            questionType,
        });
    });
};

export const getSessionMessageEventDetails = async (id) => {
    const sessionId = parseInt(id);
    if (!sessionId) {
        throw new Error("Unable to get session id");
    }

    const sessionDetails = await Session.findOne({
        where: { sessionId },
        include: [
            { 
                model: Message,
                as: 'messages',
                include: [
                    {
                        model: MessageEventDetails,
                        as: 'eventDetails',
                    }
                ]
            }
        ]
    });

    return sessionDetails;
}