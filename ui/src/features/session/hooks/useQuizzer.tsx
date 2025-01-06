import {Message} from "../../../types";
import {MessageEventDetailsRequest} from "../../../services/server/types";
import {
    useAddMessageEventDetailsMutation,
    useAddMessageQuestionTypesMutation
} from "../../../services/server/serverApi";


export const useQuizzer = () => {
    const questionMessage = 'CODE CRUNCHER - QUESTION';
    const quizzerResponses = ['INCORRECT!', 'PARTIALLY CORRECT!', 'CORRECT!'];

    const [addEvent] = useAddMessageEventDetailsMutation();
    const [addQuestionTypes] = useAddMessageQuestionTypesMutation();

    const isQuizQuestion = (message: Message): boolean => {
        const regexQuestion = new RegExp(`^${questionMessage} \d+`);
        return /^CODE CRUNCHER - QUESTION \d+/.test(message.content);
        // return message.content.includes(questionMessage);
    };

    const isQuizzerResponse = (message: Message): boolean => {
        const regexResponse = new RegExp(`^QUESTION (\\d+):\\s(${quizzerResponses.join('|')})\\b`);
        return regexResponse.test(message.content);
    };

    const handleQuizQuestion = async (message: Message): Promise<Message> => {
        const eventDetails = await addEvent(getEventDetails(message)).unwrap();

        const questionTypes = getQuestionTypes(message);

        await addQuestionTypes({messageEventId: eventDetails.messageEventId, questionTypes});

        return message;
    };

    const getEventDetails = (message: Message): MessageEventDetailsRequest => {
        const questionId =  parseInt(/QUESTION (\d+)/.exec(message.content)?.[1] ?? '0');

        return {
            messageId: message.messageId,
            questionId,
        };
    };

    const getQuestionTypes = (message: Message): string[] => {
        return (/(Data Types|Datatype): ([\w,\s]+)(\n){2}/.exec(message.content)?.[1] ?? '').split(', ');
    };

    return {
        isQuizQuestion,
        handleQuizQuestion,
        isQuizzerResponse,
    };
};
