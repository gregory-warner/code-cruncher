import {GenericResponse, Message} from "../../../types";
import {MessageEventDetailsRequest} from "../../../services/server/types";

export const useQuizzer = () => {
    const questionMessage = 'CODE CRUNCHER - QUESTION';

    const isQuestion = (message: Message): boolean => {
        return message.content.includes(questionMessage);
    }

    const getEventDetails = (message: Message): MessageEventDetailsRequest => {
        const questionId =  parseInt(/QUESTION (\d+)/.exec(message.content)?.[1] ?? '0');

        return {
            messageId: message.messageId,
            questionId,
        };
    }

    const getQuestionTypes = (message: Message): string[] => {
        return (/(Data Types|Datatype): ([\w,\s]+)(\n){2}/.exec(message.content)?.[1] ?? '').split(', ');
    }
    const handleQuizQuestion = () => {

    };

    return {
        isQuestion,
        getEventDetails,
        getQuestionTypes,
    }
};
