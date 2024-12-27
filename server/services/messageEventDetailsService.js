import {MessageEventDetails} from "../models/models.js";

export const addDetails = async (details) => {
    const questionId = parseInt(details.questionId ?? '');
    const messageId = parseInt(details.messageId ?? '');

    if (!questionId || !messageId) {
        throw new Error('Missing required parameters');
    }

    MessageEventDetails.create({
        questionId, messageId
    })
};