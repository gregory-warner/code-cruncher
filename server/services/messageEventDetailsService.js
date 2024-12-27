export const addDetails = async (details) => {
    const questionId = parseInt(details.questionId ?? '');
    const messageId = parseInt(details.messageId ?? '');

    if (!questionId || !messageId) {
        throw new Error('Missing required parameters');
    }
};