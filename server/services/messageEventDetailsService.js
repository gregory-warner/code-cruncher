import {Message, MessageEventDetails, MessageQuestionType} from "../models/models.js";

const getValidatedDetails = (details) => {
    const validatedDetails = {};

    if (!Number.isInteger(details.questionId)) {
        throw new Error("Missing required parameter 'questionId'");
    }
    validatedDetails.questionId = details.questionId;

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
}